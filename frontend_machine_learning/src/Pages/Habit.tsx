import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { initialUserData } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "../interfaces";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { FcApproval, FcCancel } from "react-icons/fc";

function Habit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState({
    message: "",
    button: "",
  });

  useEffect(() => {
    if (location.state === null) navigate("/", { state: userData });
    else setUserData(location.state);
    console.log(userData);
  }, [location]);

  const handleChange = (field: any, value: any) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePrev = () => {
    navigate("/", { state: userData });
  };

  const hitApi = async (userData: UserData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/RestAPI/predict/",
        [userData],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while fetching data from API");
    }
  };

  const handleSubmit = async () => {
    if (userData.FAVC == null) {
      setModal({
        message:
          "Please indicate if you have a high frequency of consuming high-calorie foods.",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
    } else if (userData.SMOKE == null) {
      setModal({
        message: "Please indicate if you smoke.",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
    } else if (userData.SCC == null) {
      setModal({
        message: "Please indicate if you monitor your calorie intake.",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
    } else if (userData.CAEC == null) {
      setModal({
        message: "Please indicate if you consume food between meals.",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
    } else if (userData.CALC == null) {
      setModal({
        message: "Please indicate if you drink alcohol.",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
    } else if (
      userData.FCVC === null ||
      userData.FCVC < 1 ||
      userData.FCVC > 10
    ) {
      setModal({
        message: "Please indicate how often you consume vegetables (1 to 10).",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
      return;
    } else if (
      userData.CH2O === null ||
      userData.CH2O < 1 ||
      userData.CH2O > 10
    ) {
      setModal({
        message:
          "Please indicate how many glasses of water you consume each day (1 to 10).",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
      return;
    } else if (userData.NCP === null || userData.NCP < 1 || userData.NCP > 4) {
      setModal({
        message: "Please indicate how many main meals you have (1 to 4).",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
      return;
    } else if (userData.FAF === null || userData.FAF < 1 || userData.FAF > 10){
      setModal({
        message:
          "Please indicate how often you engage in physical activity (1 to 10).",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
      return;
    } else if (userData.TUE === null || userData.TUE < 1 || userData.TUE > 24) {
      setModal({
        message:
          "Please indicate how much time you spend using technology devices (1 to 24).",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
      return;
    } else if (userData.MTRANS == null) {
      setModal({
        message: "Please indicate what mode of transportation you use.",
        button: "Yes, I'm Understand",
      });
      setOpenModal(true);
    } else {
      try {
        const postData: UserData  = {
          Height: (userData.Height ?? 0) / 100,
          FCVC: userData.FCVC * (3 / 10),
          CH2O: userData.CH2O * (3 / 10),
          FAF: userData.FAF * (3 / 10),
          TUE: userData.TUE * (2 / 24),
          NCP: userData.NCP,
          FAVC: userData.FAVC,
          SMOKE: userData.SMOKE,
          SCC: userData.SCC,
          CAEC: userData.CAEC,
          CALC: userData.CALC,
          MTRANS: userData.MTRANS,
          Age: userData.Age,
          family_history_with_overweight: userData.family_history_with_overweight,
          Gender: userData.Gender,
          Weight: userData.Weight
        };
        console.log("🚀 ~ postData:", postData);
        const result = await hitApi(postData);
        setModal({
          message: result.replace("_", " "),
          button: "Ok",
        });
        setOpenModal(true);
      } catch (error) {
        console.error("Error while fetching data from API:", error);
        setModal({
          message: "Error occurred while fetching data from API",
          button: "Yes, I'm Understand",
        });
        setOpenModal(true);
      }
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        size="xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {modal.button === "Ok" ? (
              <FcApproval className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            ) : (
              <FcCancel className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            )}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {modal.message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={modal.button === "Ok" ? "success" : "failure"}
                onClick={() => {
                  setOpenModal(false);
                  if (modal.button === "Ok") navigate("/");
                }}
              >
                {modal.button}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-extrabold text-3xl">Habit And Lifestyle</h1>
        <div className="flex flex-col items-center m-4">
          <div className="flex flex-row">
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <h2 className="font-bold mb-4 text-xl">
                  Do you have a high frequency of <br />
                  consuming high-calorie foods?
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <Card
                    className={`w-72 h-60 items-center p-4 card mb-4 ${
                      userData.FAVC === "yes" ? "bg-gray-200" : ""
                    }`}
                    imgSrc="https://cdn-icons-png.flaticon.com/128/157/157977.png"
                    onClick={() => handleChange("FAVC", "yes")}
                  >
                    <h5 className="text-xl tracking-tight text-gray-900">
                      Yes
                    </h5>
                  </Card>
                  <Card
                    className={`w-72 h-60 items-center p-4 card ${
                      userData.FAVC === "no" ? "bg-gray-200" : ""
                    }`}
                    imgSrc="https://cdn-icons-png.flaticon.com/128/4838/4838224.png"
                    onClick={() => handleChange("FAVC", "no")}
                  >
                    <h5 className="text-xl tracking-tight text-gray-900">No</h5>
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <h2 className="font-bold pb-5 text-xl">Do you smoke?</h2>
                <div className="flex flex-col items-center justify-center">
                  <Card
                    className={`w-72 h-60 items-center p-4 card mb-4 ${
                      userData.SMOKE === "yes" ? "bg-gray-200" : ""
                    }`}
                    imgSrc="https://cdn-icons-png.flaticon.com/128/157/157977.png"
                    onClick={() => handleChange("SMOKE", "yes")}
                  >
                    <h5 className="text-xl tracking-tight text-gray-900">
                      Yes
                    </h5>
                  </Card>
                  <Card
                    className={`w-72 h-60 items-center p-4 card ${
                      userData.SMOKE === "no" ? "bg-gray-200" : ""
                    }`}
                    imgSrc="https://cdn-icons-png.flaticon.com/128/4838/4838224.png"
                    onClick={() => handleChange("SMOKE", "no")}
                  >
                    <h5 className="text-xl tracking-tight text-gray-900">No</h5>
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center justify-center">
                <h2 className="font-bold pb-5 text-xl">
                  Do you monitor your calorie intake?
                </h2>
                <div className="flex flex-col items-center justify-center">
                  <Card
                    className={`w-72 h-60 items-center p-4 card mb-4 ${
                      userData.SCC === "yes" ? "bg-gray-200" : ""
                    }`}
                    imgSrc="https://cdn-icons-png.flaticon.com/128/157/157977.png"
                    onClick={() => handleChange("SCC", "yes")}
                  >
                    <h5 className="text-xl tracking-tight text-gray-900">
                      Yes
                    </h5>
                  </Card>
                  <Card
                    className={`w-72 h-60 items-center p-4 card ${
                      userData.SCC === "no" ? "bg-gray-200" : ""
                    }`}
                    imgSrc="https://cdn-icons-png.flaticon.com/128/4838/4838224.png"
                    onClick={() => handleChange("SCC", "no")}
                  >
                    <h5 className="text-xl tracking-tight text-gray-900">No</h5>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <h2 className="font-bold pb-3 text-xl">
                  Do you consume food between meals?
                </h2>
                <div className="flex items-center justify-center p-2 flex-col">
                  <div className="flex flex-row">
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CAEC === "no" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/10595/10595791.png"
                      onClick={() => handleChange("CAEC", "no")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        No
                      </h5>
                    </Card>
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CAEC === "Sometimes" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/10595/10595792.png"
                      onClick={() => handleChange("CAEC", "Sometimes")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        Sometimes
                      </h5>
                    </Card>
                  </div>
                  <div className="flex flex-row">
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CAEC === "Frequently" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/4626/4626487.png"
                      onClick={() => handleChange("CAEC", "Frequently")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        Frequently
                      </h5>
                    </Card>
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CAEC === "Always" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/10595/10595794.png"
                      onClick={() => handleChange("CAEC", "Always")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        Always
                      </h5>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-5">
              <div className="flex flex-col items-center">
                <h2 className="font-bold pb-3 text-xl">
                  Do you drink alcohol?
                </h2>
                <div className="flex items-center justify-center p-2 flex-col">
                  <div className="flex flex-row">
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CALC === "no" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/10595/10595791.png"
                      onClick={() => handleChange("CALC", "no")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        No
                      </h5>
                    </Card>
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CALC === "Sometimes" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/10595/10595792.png"
                      onClick={() => handleChange("CALC", "Sometimes")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        Sometimes
                      </h5>
                    </Card>
                  </div>
                  <div className="flex flex-row">
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CALC === "Frequently" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/4626/4626487.png"
                      onClick={() => handleChange("CALC", "Frequently")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        Frequently
                      </h5>
                    </Card>
                    <Card
                      className={`w-72 h-60 items-center p-4 card m-3 ${
                        userData.CALC === "Always" ? "bg-gray-200" : ""
                      }`}
                      imgSrc="https://cdn-icons-png.flaticon.com/128/10595/10595794.png"
                      onClick={() => handleChange("CALC", "Always")}
                    >
                      <h5 className="text-xl tracking-tight text-gray-900">
                        Always
                      </h5>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col m-3">
              <div className="flex justify-center m-4">
                <div className="flex flex-col items-center">
                  <h2 className="font-bold pb-3 text-xl flex items-center flex-col">
                    How often do you consume vegetables, ranging from 1 to 10?
                    <div className="w-96 h-96">
                      <Card className="w-full h-full items-center card mr-5 pt-5 mt-3">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/4163/4163704.png"
                          alt=""
                        />
                        <input
                          className="rounded-xl mt-2"
                          type="number"
                          name="FCVC"
                          id="FCVC"
                          value={userData.FCVC || ""}
                          placeholder="Range 1 to 10"
                          onChange={(e) => handleChange("FCVC", e.target.value)}
                          required
                        />
                      </Card>
                    </div>
                  </h2>
                </div>
              </div>
              <div className="flex justify-center m-4">
                <div className="flex flex-col items-center">
                  <h2 className="font-bold pb-3 text-xl flex items-center flex-col">
                    How many main meals do you have, ranging from 1 to 4?
                    <div className="w-96 h-96">
                      <Card className="w-full h-full items-center card mr-5 pt-5 mt-3">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/2771/2771460.png"
                          alt=""
                        />
                        <input
                          className="rounded-xl mt-2"
                          type="number"
                          name="NCP"
                          id="NCP"
                          value={userData.NCP || ""}
                          placeholder="Range 1 to 4"
                          onChange={(e) => handleChange("NCP", e.target.value)}
                          required
                        />
                      </Card>
                    </div>
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col m-3">
              <div className="flex justify-center m-4">
                <div className="flex flex-col items-center">
                  <h2 className="font-bold pb-3 text-xl">
                    How many glasses of water do you consume each day, ranging
                    from 1 to 10?
                  </h2>
                  <div className="w-96 h-96">
                    <Card className="w-full h-full items-center card mr-5 pt-5 mt-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/175/175801.png"
                        alt=""
                      />
                      <input
                        className="rounded-xl mt-2"
                        type="number"
                        name="CH2O"
                        id="CH2O"
                        value={userData.CH2O || ""}
                        placeholder="Range 1 to 10"
                        onChange={(e) => handleChange("CH2O", e.target.value)}
                        required
                      />
                    </Card>
                  </div>
                </div>
              </div>
              <div className="flex justify-center m-4">
                <div className="flex flex-col items-center">
                  <h2 className="font-bold pb-3 text-xl">
                    How often do you engage in physical activity, with a range
                    from 1 to 10?
                  </h2>
                  <div className="w-96 h-96">
                    <Card className="w-full h-full items-center card mr-5 pt-5 mt-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1466/1466426.png"
                        alt=""
                      />
                      <input
                        className="rounded-xl mt-2"
                        type="number"
                        name="FAF"
                        id="FAF"
                        value={userData.FAF || ""}
                        placeholder="Range 1 to 10"
                        onChange={(e) => handleChange("FAF", e.target.value)}
                        required
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-4">
            <div className="flex flex-col items-center">
              <h2 className="font-bold pb-3 text-xl">
                How much time do you spend using technology devices, with a
                range from 1 to 24?
              </h2>
              <div className="w-96 h-96">
                <Card className="w-full h-full items-center card mr-5 pt-5 mt-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3633/3633483.png"
                    alt=""
                  />
                  <input
                    className="rounded-xl mt-2"
                    type="number"
                    name="TUE"
                    id="TUE"
                    value={userData.TUE || ""}
                    placeholder="Range 1 to 24"
                    onChange={(e) => handleChange("TUE", e.target.value)}
                    required
                  />
                </Card>
              </div>
            </div>
          </div>

          <div className="flex justify-center m-4">
            <div className="flex flex-col items-center">
              <h2 className="font-bold pb-3 text-xl">
                What mode of transportation do you use?
              </h2>
              <div className="flex items-center justify-center p-2">
                <Card
                  className={`w-64 h-56 items-center p-4 card mr-3 ${
                    userData.MTRANS === "Public_Transportation"
                      ? "bg-gray-200"
                      : ""
                  }`}
                  imgSrc="https://cdn-icons-png.flaticon.com/128/9235/9235252.png"
                  onClick={() =>
                    handleChange("MTRANS", "Public_Transportation")
                  }
                >
                  <h5 className="text-base tracking-tight text-gray-900">
                    Public Transportation
                  </h5>
                </Card>
                <Card
                  className={`w-64 h-56 items-center p-4 card mr-3 ${
                    userData.MTRANS === "Automobile" ? "bg-gray-200" : ""
                  }`}
                  imgSrc="https://cdn-icons-png.flaticon.com/128/1085/1085961.png"
                  onClick={() => handleChange("MTRANS", "Automobile")}
                >
                  <h5 className="text-base tracking-tight text-gray-900">
                    Automobile
                  </h5>
                </Card>
                <Card
                  className={`w-64 h-56 items-center p-4 card mr-3 ${
                    userData.MTRANS === "Walking" ? "bg-gray-200" : ""
                  }`}
                  imgSrc="https://cdn-icons-png.flaticon.com/128/5604/5604658.png"
                  onClick={() => handleChange("MTRANS", "Walking")}
                >
                  <h5 className="text-base tracking-tight text-gray-900">
                    Walking
                  </h5>
                </Card>
                <Card
                  className={`w-64 h-56 items-center p-4 card ${
                    userData.MTRANS === "Bike" ? "bg-gray-200" : ""
                  }`}
                  imgSrc="https://cdn-icons-png.flaticon.com/128/923/923743.png"
                  onClick={() => handleChange("MTRANS", "Bike")}
                >
                  <h5 className="text-base tracking-tight text-gray-900">
                    Bike
                  </h5>
                </Card>
                <Card
                  className={`w-64 h-56 items-center p-4 card ml-3 ${
                    userData.MTRANS === "Motorbike" ? "bg-gray-200" : ""
                  }`}
                  imgSrc="https://cdn-icons-png.flaticon.com/128/5637/5637217.png"
                  onClick={() => handleChange("MTRANS", "Motorbike")}
                >
                  <h5 className="text-base tracking-tight text-gray-900">
                    Motorbike
                  </h5>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between mr-3 pb-2">
        <Button
          outline
          pill
          className="border-black ml-3"
          onClick={() => handlePrev()}
        >
          <HiOutlineArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          outline
          pill
          className="border-black"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default Habit;

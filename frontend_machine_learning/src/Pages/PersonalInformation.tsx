import React, { useState, useEffect } from "react";
import { Button, Card, Modal, TextInput } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { initialUserData } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import { FcCancel } from "react-icons/fc";

function PersonalInformation() {
  const [userData, setUserData] = useState(initialUserData);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === null) setUserData(initialUserData);
    else setUserData(location.state);
    console.log(userData);
  }, [location]);

  const handleChange = (field: any, value: any) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(userData);
  };

  const handleNext = () => {
    if (userData.Gender == null) {
      setModalMessage("Please select your gender.");
      setOpenModal(true);
    } else if (userData.Age == null) {
      setModalMessage("Please enter your age.");
      setOpenModal(true);
    } else if (userData.Height == null) {
      setModalMessage("Please enter your height.");
      setOpenModal(true);
    } else if (userData.Weight == null) {
      setModalMessage("Please enter your weight.");
      setOpenModal(true);
    } else if (userData.family_history_with_overweight == null) {
      setModalMessage(
        "Please indicate if you have a family history of overweight."
      );
      setOpenModal(true);
    } else {
      navigate("/habit", { state: userData });
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
            <FcCancel className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {modalMessage}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm understand"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-extrabold text-3xl">Personal Information</h1>
        <div className="flex flex-col items-center m-4">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <h2 className="font-bold pb-3 text-2xl">Gender</h2>
              <div className="flex">
                <Card
                  className={`w-72 h-80 items-center card mr-5 ${
                    userData.Gender === "Male" ? "bg-gray-200" : ""
                  }`}
                  imgAlt="Male"
                  imgSrc="https://img.icons8.com/ios/250/000000/user-male.png"
                  onClick={() => handleChange("Gender", "Male")}
                >
                  <h5 className="text-xl tracking-tight text-gray-900">Male</h5>
                </Card>
                <Card
                  className={`w-72 h-80 items-center card ml-5 ${
                    userData.Gender === "Female" ? "bg-gray-200" : ""
                  }`}
                  imgAlt="Female"
                  imgSrc="https://img.icons8.com/ios/250/000000/user-female.png"
                  onClick={() => handleChange("Gender", "Female")}
                >
                  <h5 className="text-xl tracking-tight text-gray-900">
                    Female
                  </h5>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-4">
            <div className="flex flex-col items-center">
              <h2 className="font-bold pb-3 text-2xl">Age | Height | Weight</h2>
              <div className="flex">
                <Card
                  className="w-72 h-80 items-center card mx-5 pt-5"
                  imgAlt="Age"
                  imgSrc="https://cdn-icons-png.flaticon.com/128/5670/5670747.png"
                >
                  <TextInput
                    id="age"
                    type="number"
                    placeholder="Input your age here..."
                    value={userData.Age || ""}
                    onChange={(e) => handleChange("Age", e.target.value)}
                    required
                  />
                </Card>
                <Card
                  className="w-72 h-80 items-center card mx-5 pt-5"
                  imgAlt="Height"
                  imgSrc="https://cdn-icons-png.flaticon.com/128/4425/4425046.png"
                >
                  <TextInput
                    id="height"
                    type="number"
                    value={userData.Height || ""}
                    placeholder="Input your height here..."
                    onChange={(e) => handleChange("Height", e.target.value)}
                    required
                  />
                </Card>
                <Card
                  className="w-72 h-80 items-center card mx-5 pt-5"
                  imgAlt="Weight"
                  imgSrc="https://cdn-icons-png.flaticon.com/128/847/847345.png"
                >
                  <TextInput
                    id="weight"
                    type="number"
                    value={userData.Weight || ""}
                    placeholder="Input your weight here..."
                    onChange={(e) => handleChange("Weight", e.target.value)}
                    required
                  />
                </Card>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-4">
            <div className="flex flex-col items-center">
              <h2 className="font-bold pb-3 text-2xl">
                Do you have a family history of overweight?
              </h2>
              <div className="flex">
                <Card
                  className={`w-72 h-60 items-center p-4 card mr-5 ${
                    userData.family_history_with_overweight === "yes"
                      ? "bg-gray-200"
                      : ""
                  }`}
                  imgAlt="True"
                  imgSrc="https://cdn-icons-png.flaticon.com/128/157/157977.png"
                  onClick={() =>
                    handleChange("family_history_with_overweight", "yes")
                  }
                >
                  <h5 className="text-xl tracking-tight text-gray-900">Have</h5>
                </Card>
                <Card
                  className={`w-72 h-60 items-center p-4 card ml-5 ${
                    userData.family_history_with_overweight === "no"
                      ? "bg-gray-200"
                      : ""
                  }`}
                  imgAlt="False"
                  imgSrc="https://cdn-icons-png.flaticon.com/128/4838/4838224.png"
                  onClick={() =>
                    handleChange("family_history_with_overweight", "no")
                  }
                >
                  <h5 className="text-xl tracking-tight text-gray-900">
                    Don't Have
                  </h5>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end mr-3 pb-2">
        <Button
          outline
          pill
          className="border-black"
          onClick={() => handleNext()}
        >
          <HiOutlineArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}

export default PersonalInformation;

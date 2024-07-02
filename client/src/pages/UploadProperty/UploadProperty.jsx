import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import UploadProperty1 from "../../components/UploadProperty/UploadProperty1/UploadProperty1";
import UploadProperty2 from "../../components/UploadProperty/UploadProperty2/UploadProperty2";
import UploadProperty3 from "../../components/UploadProperty/UploadProperty3/UploadProperty3";
import UploadProperty4 from "../../components/UploadProperty/UploadProperty4/UploadProperty4";
import UploadPropertyNav from "../../components/UploadProperty/UploadPropertyNav/UploadPropertyNav";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

function Form() {
  const [page, setPage] = useState(1);
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const { token } = useLogin();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    bathrooms: 0,
    bedrooms: 0,
    photos: [],
    amenities: [],
    description: "",
    house_rules: [],
    title: "",
    type: "",
    address: {
      country: "",
      city: "",
      street: "",
      house_number: "",
      postcode: "",
    },
  });
  const { performFetch } = useFetch("/property/upload");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (page === 1) {
      if (
        !formData.title &&
        !formData.address.country &&
        !formData.address.city &&
        !formData.address.street &&
        !formData.address.house_number
      ) {
        errors.country =
          "Please enter a title,country,city,street,house number and postcode for your home.";
        isValid = false;
      } else if (!formData.address.country) {
        errors.country = "Please enter your country.";
        isValid = false;
      } else if (!formData.address.city) {
        errors.city = "Please enter your city.";
        isValid = false;
      } else if (!formData.address.street) {
        errors.street = "Please enter your street.";
        isValid = false;
      } else if (!formData.address.house_number) {
        errors.house_number = "Please enter your house number.";
        isValid = false;
      } else if (!formData.address.postcode) {
        errors.postcode = "Please enter your postcode.";
        isValid = false;
      } else if (!formData.title) {
        errors.title = "Please enter your home title.";
      }

      if (!formData.type) {
        errors.type = "Please select a home type.";
        isValid = false;
      }
    } else if (page === 2) {
      if (formData.amenities.length === 0) {
        errors.amenities = "Please select at least one amenity.";
        isValid = false;
      }
    } else if (page === 3) {
      if (!formData.bedrooms && !formData.bathrooms) {
        errors.bedrooms = "Please enter the number of bedrooms and bathrooms.";
        isValid = false;
      } else {
        if (!formData.bedrooms) {
          errors.bedrooms = "Please enter the number of bedrooms.";
          isValid = false;
        }

        if (!formData.bathrooms) {
          errors.bathrooms = "Please enter the number of bathrooms.";
          isValid = false;
        }

        if (formData.photos.length === 0) {
          errors.photos = "Please upload at least one photo.";
          isValid = false;
        }
      }

      if (formData.photos.length === 0) {
        errors.photos = "Please upload at least one photo.";
        isValid = false;
      }
    } else if (page === 4) {
      if (!formData.description.trim()) {
        errors.description = "Please provide a description.";
        isValid = false;
      }

      if (formData.house_rules.length === 0) {
        errors.rules = "Please select at least one rule.";
        isValid = false;
      }
    }

    return { isValid, errors };
  };

  const goToPreviousPage = () => {
    setPage((currpage) => currpage - 1);
  };

  const goToNextPage = () => {
    const { isValid, errors } = validateForm();
    if (isValid) {
      setPage((currpage) => currpage + 1);
    } else {
      setErrors(errors);
    }
  };

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);
    const base64Photos = await Promise.all(files.map(fileToBase64));
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: [...prevFormData.photos, ...base64Photos],
    }));

    setShowPhotoInput(true);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData((prevFormData) => ({ ...prevFormData, photos: updatedPhotos }));
  };

  const PageDisplay = () => {
    if (page === 1) {
      return (
        <UploadProperty1
          formdata={formData}
          setformdata={setFormData}
          goToNextPage={goToNextPage}
          validateForm={validateForm}
          errors={errors}
          goToPreviousPage={goToPreviousPage}
        />
      );
    } else if (page === 2) {
      return (
        <UploadProperty2
          formdata={formData}
          setformdata={setFormData}
          goToNextPage={goToNextPage}
          amenities={formData.amenities}
          validateForm={validateForm}
          errors={errors}
          goToPreviousPage={goToPreviousPage}
        />
      );
    } else if (page === 3) {
      return (
        <UploadProperty3
          formdata={formData}
          setformdata={setFormData}
          goToNextPage={goToNextPage}
          validateForm={validateForm}
          errors={errors}
          goToPreviousPage={goToPreviousPage}
          handlePhotoUpload={handlePhotoUpload}
          handleDeletePhoto={handleDeletePhoto}
          showPhotoInput={showPhotoInput}
        />
      );
    } else if (page === 4) {
      return (
        <UploadProperty4
          formdata={formData}
          setformdata={setFormData}
          submitFormData={submitFormData}
          validateForm={validateForm}
          errors={errors}
          goToPreviousPage={goToPreviousPage}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      );
    }
  };

  const submitFormData = () => {
    const { isValid, errors } = validateForm();
    if (isValid) {
      performFetch({
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setShowPopup(true);
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
      <UploadPropertyNav
        goToPreviousPage={goToPreviousPage}
        validateForm={validateForm}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          gap: 17,
        }}
      >
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: step === page ? "#fff" : "gray",
              margin: 0,
              cursor: "pointer",
            }}
            onClick={() => setPage(step)}
          />
        ))}
      </div>
      {PageDisplay()}
    </div>
  );
}

export default Form;

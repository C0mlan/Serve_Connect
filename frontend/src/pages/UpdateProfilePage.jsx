import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfilePage = () => {
  const [bio, setBio] = useState("");
  const [basedOn, setBasedOn] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [accountType, setAccountType] = useState("volunteer");

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  // console.log(user);
  const handleBasedOnChange = (e) => {
    if (!basedOn.includes(e.target.value) && e.target.checked === true) {
      setBasedOn([...basedOn, e.target.value]);
    } else {
      let basedOnCopy = basedOn.filter((el) => el !== e.target.value);
      setBasedOn(basedOnCopy);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (accountType === "volunteer" && basedOn.length == 0) {
      enqueueSnackbar("Select at least one volunteering criteria!", {
        variant: "error",
      });
      return;
    } else if (accountType === "organization" && orgName == "") {
      enqueueSnackbar("Please enter the name of your organization", {
        variant: "error",
      });
      return;
    }

    const data = {
      account_type: accountType,
      based_on: basedOn,
      org_name: orgName,
      bio,
      user: 1,
    };

    try {
      const res = await api.post("/update-profile/", data);
      // console.log(res);
      enqueueSnackbar(res.data.message, { variant: "success" });
      setUser({
        ...user,
        accountType: res.data.account_type,
        isProfileUpdated: res.data.prof_up,
        isEmailVerified: res.data.is_verified,
      });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      enqueueSnackbar(
        "There was an error updating the profile, please try again!",
        { variant: "error" }
      );
    }
  };

  return (
    <div>
      <h1>Please update your profile to continue!</h1>
      <form onSubmit={handleUpdateProfile}>
        <label htmlFor="account-type">Please select an account type</label>
        <select
          id="account-type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="volunteer">Volunteer</option>
          <option value="individual">Volunteer Seeker (Individual)</option>
          <option value="organization">Volunteer Seeker (Organization)</option>
        </select>
        <br />
        {accountType === "volunteer" && (
          <>
            <p>Volunteering based on:</p>
            <input
              type="checkbox"
              id="skills"
              value="skills"
              onChange={handleBasedOnChange}
            />
            <label htmlFor="skills">SKills</label>
            <input
              type="checkbox"
              value="interests"
              id="interests"
              onChange={handleBasedOnChange}
            />
            <label htmlFor="interests">Interests</label>
            <input
              type="checkbox"
              value="availability"
              id="availability"
              onChange={handleBasedOnChange}
            />
            <label htmlFor="availability">Availability</label>
            <br />
          </>
        )}
        {accountType === "organization" && (
          <>
            <label>Name of your organization</label>
            <input
              type="text"
              id="org-name"
              value={orgName}
              pattern="[A-Z][A-Za-z0-9\s.]{2,}"
              title="Must start with an uppercase letter, followed by two or more letters or numbers."
              onChange={(e) => setOrgName(e.target.value)}
            />
          </>
        )}
        <br />
        <label htmlFor="bio">
          Short description about
          {accountType === "volunteer"
            ? "yourself"
            : accountType === "individual"
            ? "yourself"
            : "your organization"}
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <input type="submit" value="Update Profile" />
      </form>
    </div>
  );
};

export default UpdateProfilePage;

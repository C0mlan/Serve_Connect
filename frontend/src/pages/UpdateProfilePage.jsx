import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { USER } from "../helpers/constants";
import Button from "../components/Button";

const UpdateProfilePage = () => {
  const [bio, setBio] = useState("");
  const [basedOn, setBasedOn] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [accountType, setAccountType] = useState("volunteer");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const loggedInUser = localStorage.getItem(USER);
  // console.log(user);
  const handleBasedOnChange = (e) => {
    if (!basedOn.includes(e.target.value) && e.target.checked === true) {
      setBasedOn([...basedOn, e.target.value]);
    } else {
      let basedOnCopy = basedOn.filter((el) => el !== e.target.value);
      setBasedOn(basedOnCopy);
    }
  };

  const handleBioChange = (e) => {
    const bio = e.target.value;
    console.log(bio.length);

    if (bio.length === 501) {
      enqueueSnackbar(
        "The bio field should not contain more than 500 characters!",
        { variant: "error" }
      );
      return;
    } else {
      setBio(bio.slice(0, 500));
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

    if (accountType === "organization" && orgType == "") {
      enqueueSnackbar("Please select an organization type", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    const data = {
      account_type: accountType,
      based_on: basedOn,
      org_name: orgName,
      org_type: orgType,
      bio,
    };

    try {
      const res = await api.patch("/user/update-profile/", data);
      // console.log(res);
      enqueueSnackbar(res.data.message, { variant: "success" });
      if (loggedInUser !== null) {
        let user = JSON.parse(loggedInUser);
        user["isProfileUpdated"] = true;
        user["orgName"] = orgName;
        user["orgType"] = orgType;
        user["bio"] = bio;
        user["basedOn"] = basedOn;
        user["accountType"] = accountType;
        localStorage.setItem(USER, JSON.stringify(user));
      }

      setUser({
        ...user,
        basedOn: res.data.based_on,
        accountType: res.data.account_type,
        isProfileUpdated: res.data.prof_up,
        isEmailVerified: res.data.is_verified,
      });
      navigate("/listings");
    } catch (err) {
      console.log(err);
      if (err.status === 400) {
        if (err.response.data["bio"][0].includes("no more than")) {
          enqueueSnackbar(
            "The bio field should not contain more than 500 characters!",
            {
              variant: "error",
            }
          );
        } else {
          enqueueSnackbar(
            "There was an error updating the profile, please try again!",
            { variant: "error" }
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <h1 className="mb-4 text-xl font-semibold text-center">
        Update your profile to continue!
      </h1>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-2">
          <label htmlFor="account-type" className="block mb-2">
            Please select an account type
          </label>
          <select
            id="account-type"
            value={accountType}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-gray-500  focus:outline-none block w-full p-2.5"
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="volunteer">Volunteer</option>
            <option value="individual">Volunteer Seeker (Individual)</option>
            <option value="organization">
              Volunteer Seeker (Organization)
            </option>
          </select>
        </div>
        {accountType === "volunteer" && (
          <div className="mb-2">
            <div className="mb-2">Volunteering based on:</div>
            <div className="flex gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skills"
                  value="skills"
                  className="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
                  onChange={handleBasedOnChange}
                />
                <label htmlFor="skills">SKills</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="interests"
                  id="interests"
                  className="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm   focus:outline-none "
                  onChange={handleBasedOnChange}
                />
                <label htmlFor="interests">Interests</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="availability"
                  id="availability"
                  className="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm   focus:outline-none"
                  onChange={handleBasedOnChange}
                />
                <label htmlFor="availability">Availability</label>
              </div>
            </div>
          </div>
        )}
        {accountType === "organization" && (
          <>
            <div className="mb-2">
              <label htmlFor="org-name" className="block mb-2">
                Name of your organization
              </label>
              <input
                type="text"
                id="org-name"
                value={orgName}
                className="bg-gray-50 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none block w-full p-2.5"
                pattern="[A-Z][A-Za-z0-9\s.]{2,}"
                title="Must start with an uppercase letter, followed by two or more letters or numbers."
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="org-type" className="block mb-2">
                Please select an organization type
              </label>
              <select
                id="org-type"
                value={orgType}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-gray-500  focus:outline-none block w-full p-2.5"
                onChange={(e) => setOrgType(e.target.value)}
              >
                <option value="">Select organization type</option>
                <option value="NGO">NGO</option>
                <option value="Educational org">Educational org</option>
                <option value="Governmental org">Governmental org</option>
                <option value="Community based org">Community based org</option>
                <option value="International development org">
                  International development org
                </option>
                <option value="Religious org">Religious org</option>
                <option value="Non-Profit org">Non-Profit org</option>
                <option value="Private Sector org">Private Sector org</option>
                <option value="Corporate Social Responsibility [CSR] Initiative">
                  Corporate Social Responsibility [CSR] Initiative
                </option>
                <option value="Charity">Charity</option>
                <option value="Advocacy Group">Advocacy Group</option>
                <option value="Research Institution">
                  Research Institution
                </option>
                <option value="Youth org">Youth org</option>
                <option value="Women's org">Women's org</option>
              </select>
            </div>
          </>
        )}
        <div className="mb-2">
          <label htmlFor="bio" className="mb-2 flex justify-between">
            Short description about
            {accountType === "volunteer"
              ? " yourself"
              : accountType === "individual"
              ? " yourself"
              : " your organization"}
            {bio.length >= 450 ? (
              <span className="text-sm text-red-500">
                {bio.length}/500 characters
              </span>
            ) : (
              <span className="text-sm">{bio.length}/500 characters</span>
            )}
          </label>
          <textarea
            id="bio"
            value={bio}
            className="block p-2.5 w-full h-24 bg-gray-50 rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none "
            onChange={handleBioChange}
          ></textarea>
        </div>
        <Button
          disabled={loading}
          text="Update Profile"
          loading={loading}
        ></Button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;

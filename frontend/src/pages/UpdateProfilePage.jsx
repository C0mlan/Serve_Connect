import { useState } from "react";
import api from "../helpers/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { USER } from "../helpers/constants";

const UpdateProfilePage = () => {
  const [bio, setBio] = useState("");
  const [basedOn, setBasedOn] = useState([]);
  const [orgName, setOrgName] = useState("");
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

    // if (bio.length == 0) {
    //   enqueueSnackbar(
    //     "Please enter a short description of yourself for your bio!",
    //     {
    //       variant: "error",
    //     }
    //   );
    //   return;
    // }

    setLoading(true);
    const data = {
      account_type: accountType,
      based_on: basedOn,
      org_name: orgName,
      bio,
    };

    try {
      const res = await api.post("/user/update-profile/", data);
      // console.log(res);
      enqueueSnackbar(res.data.message, { variant: "success" });
      if (loggedInUser !== null) {
        let user = JSON.parse(loggedInUser);
        user["isProfileUpdated"] = true;
        user["orgName"] = orgName;
        user["bio"] = bio;
        user["basedOn"] = basedOn;
        user["accountType"] = accountType;
        localStorage.setItem(USER, JSON.stringify(user));
      }

      setUser({
        ...user,
        accountType: res.data.account_type,
        isProfileUpdated: res.data.prof_up,
        isEmailVerified: res.data.is_verified,
      });
      setLoading(false);
      navigate("/listings");
    } catch (err) {
      console.log(err);
      enqueueSnackbar(
        "There was an error updating the profile, please try again!",
        { variant: "error" }
      );
      setLoading(false);
    }
  };

  return (
    <div class="w-full max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
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
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-gray-500  focus:outline-none block w-full p-2.5"
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
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="skills"
                  value="skills"
                  class="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm  focus:outline-none"
                  onChange={handleBasedOnChange}
                />
                <label htmlFor="skills">SKills</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  value="interests"
                  id="interests"
                  class="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm   focus:outline-none "
                  onChange={handleBasedOnChange}
                />
                <label htmlFor="interests">Interests</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  value="availability"
                  id="availability"
                  class="w-4 h-4 mr-1 text-gray-600 bg-gray-100 border-gray-300 rounded-sm   focus:outline-none"
                  onChange={handleBasedOnChange}
                />
                <label htmlFor="availability">Availability</label>
              </div>
            </div>
          </div>
        )}
        {accountType === "organization" && (
          <div className="mb-2">
            <label className="block mb-2">Name of your organization</label>
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
        )}
        <div className="mb-2">
          <label htmlFor="bio" className="block mb-2">
            Short description about
            {accountType === "volunteer"
              ? " yourself"
              : accountType === "individual"
              ? " yourself"
              : " your organization"}
          </label>
          <textarea
            id="bio"
            value={bio}
            className="block p-2.5 w-full h-24 bg-gray-50 rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none "
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <button
          disabled={loading}
          type="submit"
          class="mt-2 disabled:bg-gray-500 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none font-medium rounded-lg px-5 py-2.5 cursor-pointer w-full sm:w-auto"
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;

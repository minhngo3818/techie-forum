import { IProfile, IProfileForm } from "../../../interfaces/profile/profile";
import axiosInst from "../../axios/axios-instance";
import {
  toastResponse,
  toastDelayedSeqMessage,
} from "../../../utils/toast-helper";
import IProject from "../../../interfaces/project/project";

/**
 * Retrieve a user profile data by collect profile name in the url
 * @param name the profile name from frontend url
 * @returns axios request instance
 */
export async function getProfile(name: string) {
  return await axiosInst.get(`profile-view/${name}`);
}

/**
 * Create a profile for the new user
 * @param data
 * @returns axios POST instance
 */
export async function createProfile(data: Partial<IProfileForm>) {
  const formData = composeProfileFormData(data);

  return await axiosInst
    .post("/profile-view/", formData)
    .then((res) => {
      let userTraits = sessionStorage.getItem("techie:traits");
      if (userTraits) {
        let userTraitsObj = JSON.parse(userTraits);
        userTraitsObj.profile_name = data.profile_name;
        sessionStorage.setItem("techie:traits", JSON.stringify(userTraitsObj));
      }

      toastResponse("success", "Your profile was created successfully!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
      toastDelayedSeqMessage("error", error.response.data.errors);
    });
}

/**
 * Update partially user profile
 * Send request data as a FormData object
 * @param profileName
 * @param data
 * @returns axios request instance
 */
export async function updateProfile(
  profileName: string,
  data: Partial<IProfileForm>
) {
  const formData = composeProfileFormData(data);
  return await axiosInst
    .patch(`/profile-view/${profileName}/`, formData)
    .then((res) => {
      if (data.profile_name !== profileName) {
        let userTraits = sessionStorage.getItem("techie:traits");
        if (userTraits) {
          let userTraitsObj = JSON.parse(userTraits);
          userTraitsObj.profile_name = !data.profile_name
            ? profileName
            : data.profile_name;
          sessionStorage.setItem(
            "techie:traits",
            JSON.stringify(userTraitsObj)
          );
        }
      }

      toastResponse("success", "Your profile was updated successfully!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
      toastDelayedSeqMessage("error", error.response.data.errors);
    });
}

/**
 * HELPERS
 */
/**
 * Pre-process each key-value of data and append to form
 * @param data : IProfileForm
 * @returns a FormData object
 */
function composeProfileFormData(data: IProfileForm): FormData {
  const formData = new FormData();
  for (var key in data) {
    let value = data[key as keyof IProfileForm];

    if (typeof value === "string" && value !== "") {
      console.log(key);
      formData.append(key, value);
    }
    if (key === "projects" && Array.isArray(value)) {
      let projects = checkAndRemoveProjects(value);

      if (projects !== null) {
        formData.append(key, JSON.stringify(projects));
      }
    }
    if (value instanceof Blob) {
      formData.append(key, value, value.name);
    }
  }

  return formData;
}

/**
 * Traverse array of Project, remove projects that does not
 * have title
 * @param projects
 * @returns new project list or null
 */
function checkAndRemoveProjects(
  projects: IProject[] | undefined
): IProject[] | null {
  if (!projects) return null;

  if (projects.length === 1 && projects[0].title === "") return null;

  let parsedProjects = [] as IProject[];
  projects.forEach((project) => {
    if (project.title !== "" || project.title !== null) {
      parsedProjects.push(Object.assign({}, project));
    }
  });

  return parsedProjects;
}

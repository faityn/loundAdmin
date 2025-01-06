"use server";

export const getExhibitionList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number
) => {
  const search = searchUrl;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/list?${search}&page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionSearchOptionList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/search_options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          locale: "mn",
        },
        redirect: "follow",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createExhibition = async (
  formdata: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedInterests: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedPurposes: any
) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("company_name", formdata.get("company_name") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);
  formData2.append("status", formdata.get("status") as string);
  formData2.append("interests", JSON.stringify(checkedInterests));
  formData2.append("purposes", JSON.stringify(checkedPurposes));
  if (image !== null) {
    formData2.append("img", image);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/create`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateExhibition = async (
  formdata: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedInterests: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedPurposes: any
) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("exhibitionId", formdata.get("exhibitionId") as string);
  formData2.append("company_name", formdata.get("company_name") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);
  formData2.append("status", formdata.get("status") as string);
  formData2.append("interests", JSON.stringify(checkedInterests));
  formData2.append("purposes", JSON.stringify(checkedPurposes));
  if (image !== null) {
    formData2.append("img", image);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/update`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteExhibition = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const changeExhibitionStatus = async (
  token: string,
  id: number,
  status: string
) => {
  try {
    const raw = JSON.stringify({
      exhibitionId: Number(id),
      status: status,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/update/status`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionLecturesList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lectures/list?page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const changeConferenceStatus = async (
  token: string,
  id: number,
  status: string
) => {
  try {
    const raw = JSON.stringify({
      conferenceId: Number(id),
      request: String(status),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/conference/update/request`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createExhibitionLectures = async (formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("exhibitionId", formdata.get("exhibitionId") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/create`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateExhibitionLectures = async (formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("lectureId", formdata.get("lectureId") as string);
  formData2.append("exhibitionId", formdata.get("exhibitionId") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/update`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteExhibitionLectures = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFeedbackDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/rating/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    console.log(response);

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getFeedbackExhibitionRatingList = async (
  token: string,
  id: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/rating/list/${id}?page=1&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionLectureDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const getExhibitionAll = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUsersAddExhibitionList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/users/search_option`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUsersListByExhibitions = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number
) => {
  const search = searchUrl;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/users/list?${search}&page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const AddUsersToExhibition = async (
  token: string,
  exhibitionId: number,
  userIds: string
) => {
  try {
    const raw = JSON.stringify({
      exhibitionId: Number(exhibitionId),
      users: userIds,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/users/create`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const ConfirmUsersToExhibition = async (
  token: string,
  userIds: string,
  status: boolean
) => {
  try {
    const raw = JSON.stringify({
      ids: userIds,
      isConfirmed: status,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/users/update/confirm`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionFeedbackList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/approved/list?${searchUrl}&page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getBannerList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banners/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getBannerDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createBanner = async (formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;
  formData2.append("title", formdata.get("title") as string);
  formData2.append("link", formdata.get("link") as string);
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/create`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateBanner = async (formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;
  formData2.append("id", formdata.get("id") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("link", formdata.get("link") as string);
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/update`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteBanner = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const uploadImage = async (formdata: FormData) => {
  const image: File | null = (formdata.get("file") as unknown) as File;
  const formData2 = new FormData();
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image/upload`,
      {
        method: "POST",
        body: formData2,
      }
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getConferenceCommunityList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/conference/community/list?page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const changeCommunityStatus = async (
  token: string,
  id: number,
  status: string
) => {
  try {
    const raw = JSON.stringify({
      communityId: Number(id),
      request: String(status),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/conference/community/update`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getConferencesList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/conferences/list?page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getConferenceDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/conference/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getConferencesOptions = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/conferences/options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateConferenceStatus = async (
  token: string,
  id: string,
  status: string
) => {
  try {
    const raw = JSON.stringify({
      conferenceId: Number(id),
      request: status,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/conference/update/request`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

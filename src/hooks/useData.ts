"use server";

import { UserExhibitionTablesType } from "@/types/adminType";

export const getInterestsOptions = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/options`,
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

export const getExhibitionTable = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/table/list/${id}`,
      {
        method: "GET",
        //body: raw,
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

export const getExhibitionTableOrder = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/table/${id}/order`,
      {
        method: "GET",
        //body: raw,
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

export const tableOrderCancel = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/conference_table/${id}`,
      {
        method: "DELETE",
        //body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    console.log(response);

    const data = await response.text();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const saveExhibitionTable = async (
  token: string,
  exhibitionId: number,
  exhibitionTableArray: UserExhibitionTablesType[]
) => {
  try {
    const raw = JSON.stringify({
      exhibitionId: Number(exhibitionId),
      tables: exhibitionTableArray,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/table/create`,
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
    console.log(response);

    const data = await response.text();
    console.log(data);
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getInterestsList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/interests/list?page=1&pageSize=50`,
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

export const getInterestsDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/interest/${id}`,
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

export const createInterests = async (token: string, title: string) => {
  try {
    const raw = JSON.stringify({
      title: title,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/interest/create`,
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

export const updateInterests = async (
  token: string,
  id: number,
  title: string
) => {
  try {
    const raw = JSON.stringify({
      interestId: id,
      title: title,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/interest/update`,
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

export const deleteInterest = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/interest/delete/${id}`,
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

export const getPurposesList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/purposes/list?page=1&pageSize=50`,
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

export const getPurposesDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/purpose/${id}`,
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

export const createPurposes = async (token: string, title: string) => {
  try {
    const raw = JSON.stringify({
      title: title,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/purpose/create`,
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

export const updatePurposes = async (
  token: string,
  id: number,
  title: string
) => {
  try {
    const raw = JSON.stringify({
      purposeId: id,
      title: title,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/purpose/update`,
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

export const deletePurposes = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/purpose/delete/${id}`,
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

export const getProfessionList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/professions/list?page=1&pageSize=50`,
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

export const getProfessionDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/profession/${id}`,
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

export const createProfession = async (token: string, title: string) => {
  try {
    const raw = JSON.stringify({
      title: title,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/profession/create`,
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

export const updateProfession = async (
  token: string,
  id: number,
  title: string
) => {
  try {
    const raw = JSON.stringify({
      professionId: id,
      title: title,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/profession/update`,
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

export const deleteProfession = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/profession/delete/${id}`,
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

export const getPrivacyList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/privacys/list`,
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

export const getPrivacyDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/privacy/${id}`,
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

export const createPrivacy = async (
  token: string,
  title: string,
  content: string,
  typeStatus: string
) => {
  try {
    const raw = JSON.stringify({
      title: title,
      slug: typeStatus,
      content: content,
      status: "use",
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/privacy/create`,
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

export const updatePrivacy = async (
  token: string,
  id: number,
  title: string,
  content: string,
  typeStatus: string
) => {
  try {
    const raw = JSON.stringify({
      id: Number(id),
      title: title,
      slug: typeStatus,
      content: content,
      status: "use",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/privacy/update`,
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

export const deletePrivacy = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/privacy/delete/${id}`,
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

export const getFaqList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/faqs/list`,
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

export const getFaqDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/faq/${id}`,
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

export const createFaq = async (
  token: string,
  question: string,
  content: string
) => {
  try {
    const raw = JSON.stringify({
      question: question,

      answer: content,
      status: "use",
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/faq/create`,
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

export const updateFaq = async (
  token: string,
  faqId: number,
  question: string,
  content: string
) => {
  try {
    const raw = JSON.stringify({
      faqId: Number(faqId),
      question: question,
      ord: "1",
      answer: content,
      status: "use",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/faq/update`,
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

export const deleteFaq = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/faq/delete/${id}`,
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

export const getNoticeList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notices/list?page=${page}&pageSize=${size}`,
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

export const createNotice = async (
  token: string,
  title: string,
  content: string
) => {
  try {
    const raw = JSON.stringify({
      title: title,
      content: content,
      status: "use",
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notice/create`,
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

export const getNoticeDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notice/${id}`,
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

export const updateNotice = async (
  token: string,
  id: number,
  title: string,
  content: string
) => {
  try {
    const raw = JSON.stringify({
      noticeId: Number(id),
      title: title,
      content: content,
      status: "use",
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notice/update`,
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

export const deleteNotice = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notice/delete/${id}`,
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

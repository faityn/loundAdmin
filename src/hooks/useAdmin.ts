"use server";

export const getAdminList = async () => {
   
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?limit=10`
    );


    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



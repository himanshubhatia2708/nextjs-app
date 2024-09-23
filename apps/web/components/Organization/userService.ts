"use server";

export async function createUser(formData: FormData) {
  try {
    const response = await fetch(`${process.env.API_HOST_URL}/v1/user`, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.log("qw", response);
    }
  } catch (error: any) {
    console.log("err", error);
    return error;
  }
}

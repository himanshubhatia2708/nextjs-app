export async function getOrganization() {
  const response = await fetch(`${process.env.API_HOST_URL}/v1/organization`, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function editOrganization(formData: FormData) {
  try {
    const { id } = formData;
    const response = await fetch(
      `${process.env.API_HOST_URL}/v1/organization/${id}`,
      {
        mode: "no-cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    return error;
  }
}

export async function createOrganization(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.API_HOST_URL}/v1/organization`,
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    return error;
  }
}

export async function deleteOrganization(id: number) {
  try {
    const response = await fetch(
      `${process.env.API_HOST_URL}/v1/organization/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete entry");
    }

    console.log("Entry deleted successfully");
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
}

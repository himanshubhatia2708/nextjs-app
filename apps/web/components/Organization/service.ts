"use server";

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
  console.log(formData);  
}

export async function createOrganizationApi(formData: FormData) {
  console.log(formData);
}

export async function deleteOrganization(id: number) {
  console.log(id);
}

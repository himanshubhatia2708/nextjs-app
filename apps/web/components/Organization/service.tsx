export async function getOrganization() {
  const response = await fetch(`${process.env.API_HOST_URL}/v1/organization`, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("qwww", response);
}

export async function editOrganization() {
  const response = await fetch(`${process.env.API_HOST_URL}/v1/organization`, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("qwww", response);
}

export async function createOrganization() {
  const response = await fetch(`${process.env.API_HOST_URL}/v1/organization`, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("qwww", response);
}

export async function deleteOrganization() {
  const response = await fetch(`${process.env.API_HOST_URL}/v1/organization`, {
    mode: "no-cors",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("qwww", response);
}

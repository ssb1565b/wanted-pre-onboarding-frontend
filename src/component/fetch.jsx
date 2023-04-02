const URL = "https://pre-onboarding-selection-task.shop";
export async function signup(param) {
  const url = `${URL + `/auth/signup`}`;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  };
  const response = await fetch(url, opts);

  if (!response) {
    alert({
      content: `실패하였습니다. ${JSON.stringify(response)}`,
    });
    return;
  }
  return response;
}

export async function signin(param) {
  console.log(JSON.stringify(param));
  const url = `${URL + `/auth/signin`}`;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  };
  const response = await fetch(url, opts);
  const accessToken = await response.json();

  if (!response) {
    alert({
      content: `실패하였습니다. ${JSON.stringify(response)}`,
    });
    return;
  }
  console.log("accessToken", accessToken.access_token);
  localStorage.setItem("JWT", accessToken.access_token);
  return response;
}

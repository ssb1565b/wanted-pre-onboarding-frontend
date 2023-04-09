const URL = "https://www.pre-onboarding-selection-task.shop";
export async function signup(param) {
  try {
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
  } catch (err) {
    console.error(`실패하였습니다. ${err}`);
  }
}

export async function signin(param) {
  try {
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
  } catch (err) {
    console.error(`실패하였습니다. ${err}`);
  }
}

export async function getTodo(access_token) {
  console.log(access_token);
  try {
    const url = `${URL + `/todos`}`;
    const opts = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, opts);
    if (!response) {
      alert({
        content: `실패하였습니다. ${JSON.stringify(response)}`,
      });
      return;
    }
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(`실패하였습니다. ${err}`);
  }
}

export async function createTodo(param, access_token) {
  try {
    const url = `${URL + `/todos`}`;
    const opts = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
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
    return true;
  } catch (err) {
    console.error(`실패하였습니다. ${err}`);
  }
}

export async function updateTodo(id, access_token, params) {
  console.log("fetch", params);
  try {
    const url = `${URL + `/todos/${id}`}`;
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(url, opts);
    if (!response) {
      alert({
        content: `실패하였습니다. ${JSON.stringify(response)}`,
      });
      return;
    }
    return response;
  } catch (err) {
    console.error(`실패하였습니다. ${err}`);
  }
}

export async function deleteTodo(id, access_token) {
  try {
    const url = `${URL + `/todos/${id}`}`;
    const opts = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const response = await fetch(url, opts);
    if (!response) {
      alert({
        content: `실패하였습니다. ${JSON.stringify(response)}`,
      });
      return;
    }
    return true;
  } catch (err) {
    console.error(`실패하였습니다. ${err}`);
  }
}

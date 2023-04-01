const URL = "https://pre-onboarding-selection-task.shop";
export async function signup(param) {
  console.log(JSON.stringify(param));
  const url = `${URL + `/auth/signup`}`;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  };
  const response = await fetch(url, opts);

  const r = await response.json();
  if (!r.success) {
    alert({
      content: JSON.stringify(r),
    });
    return;
  }
  return r;
}

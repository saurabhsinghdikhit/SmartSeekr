import { toast, ToastContainer } from 'react-toastify';
export default async function queryBuilder(url, actionMethod, data) {
  const endPoint = process.env.REACT_APP_SERVER_URL + url;
  let headerData = {
    method: actionMethod,
    headers: { 'Content-Type': 'application/json' }
  }
  if(actionMethod=="POST" || actionMethod=="PUT"){
    headerData.body= JSON.stringify(data)
  }
  try {
    const response = await fetch(endPoint, headerData);
    const body = JSON.parse(await response.text());
    if (body.errors) {
      for (const key in body.errors) {
        toast(`${body.errors[key]}`);
      }
    }
    if(body && body.stateModel && body.stateModel.errorMessage)
    toast(body.stateModel.errorMessage);
    return body.result;
  } catch (e) {
    toast(`Error in sending data to server: ${e.message}`);
  }
}
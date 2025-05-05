// const base_url = "https://credit-score.ai-horizon.io/api";
// const filePath = "https://credit-score.ai-horizon.io/api/smfgDocumentUpdate/";

const base_url = "http://localhost:3001/api"
const filePath = "http://localhost:3001/api/assets/"

const loginUrl = base_url + '/login'
const fileUploadByid = base_url + '/updateFilepath';
const startLoanForm = base_url + '/startLoanForm';
const uploadDataFetch = base_url + '/uploadDataFetch';

const API = {
    loginUrl,
    fileUploadByid,
    startLoanForm,
    uploadDataFetch,
    filePath
}

export default API

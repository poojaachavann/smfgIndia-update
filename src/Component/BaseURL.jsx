// const base_url = "https://credit-score.ai-horizon.io/api";
// const filePath = "https://credit-score.ai-horizon.io/api/smfgDocument/";

const base_url = "http://localhost:3001/api"
const filePath = "http://localhost:3001/api/smfgDocument/"

const loanformapi = base_url + '/loanformapi';
const fileUploadByid = base_url + '/updateFilepath';
const startLoanForm = base_url + '/startLoanForm';
const loginUrl = base_url + '/login'
const loanAppformDataFetch = base_url + '/loanAppformDataFetch'
const taskStatusApi = base_url + '/tasksStatus'


const API = {
    loanformapi,
    fileUploadByid,
    startLoanForm,
    loginUrl,
    loanAppformDataFetch,
    taskStatusApi,
    filePath
}

export default API

// import { exec } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { fileURLToPath } from 'url';
// import signIn from '../models/signin.models.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const outputpath = path.join(__dirname, `../`);

// export const startLoanForm = async (req, res) => {
//     const { bankStatementpdfPath, idProofpdfPath, creditBureopdfPath, userId, domain } = req.body;
//     const uniquedId = uuidv4();

//     const pythonCommand1 = `${domain === "localhost:5173"
//         ? 'C:\\smfgIndiaUpdate\\server\\smfgUpdateEnv\\Scripts\\python.exe main_id_manger.py'
//         : 'python3.11 main_id_manger.py'} --file_path "${idProofpdfPath}" --uuid "${userId}" --process_id "${uniquedId}"`;

//     const pythonCommand2 = `${domain === "localhost:5173"
//         ? 'C:\\smfgIndiaUpdate\\server\\smfgUpdateEnv\\Scripts\\python.exe main_bank_statement_manger.py'
//         : 'python3.11 main_bank_statement_manger.py'} --file_path "${bankStatementpdfPath}" --uuid "${userId}" --process_id "${uniquedId}"`;

//     const pythonCommand3 = `${domain === "localhost:5173"
//         ? 'C:\\smfgIndiaUpdate\\server\\smfgUpdateEnv\\Scripts\\python.exe main_credit_buero_manger.py'
//         : 'python3.11 main_credit_buero_manger.py'} --file_path "${creditBureopdfPath}" --uuid "${userId}" --process_id "${uniquedId}"`;

//     console.log(`Executing: ${pythonCommand1}`);
//     console.log(`Executing: ${pythonCommand2}`);
//     console.log(`Executing: ${pythonCommand3}`);

//     exec(pythonCommand1, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing first Python script: ${error}`);
//             return res.status(500).json({ error: 'Error executing first script', details: error.message });
//         }

//         const jsonPath = path.join(outputpath, 'assets', `uid-${userId}`, `pid-${uniquedId}`, `bank_statement-combined_manifest.json`);

//         fs.readFile(jsonPath, 'utf8', async (err, data) => {
//             if (err) {
//                 console.error('Error reading first JSON:', err);
//                 return res.status(500).json({ error: 'Could not read initial JSON output' });
//             }

//             try {
//                 const parsedData = JSON.parse(data);
//                 console.log('Bank Statement parsedData:', parsedData);

//                 await signIn.updateOne(
//                     { _id: userId },
//                     { $push: { 'file_response.idProof': parsedData } }
//                 );

//                 exec(pythonCommand2, (error2, stdout2, stderr2) => {
//                     if (error2) {
//                         console.error(`Error executing second Python script: ${error2}`);
//                         return res.status(500).json({ error: 'Error executing credit bureau script', details: error2.message });
//                     }

//                     const jsonPath1 = path.join(outputpath, 'assets', `uid-${userId}`, `pid-${uniquedId}`, `bank_statement-combined_manifest.json`);

//                     fs.readFile(jsonPath1, 'utf8', async (err2, data2) => {
//                         if (err2) {
//                             console.error('Error reading second JSON:', err2);
//                             return res.status(500).json({ error: 'Could not read credit report JSON output' });
//                         }

//                         try {
//                             const parsedData2 = JSON.parse(data2);
//                             console.log('Credit Report parsedData:', parsedData2);

//                             await signIn.updateOne(
//                                 { _id: userId },
//                                 { $push: { 'file_response.bankStatement': parsedData2 } }
//                             );

//                             exec(pythonCommand3, (error2, stdout2, stderr2) => {
//                                 if (error2) {
//                                     console.error(`Error executing second Python script: ${error2}`);
//                                     return res.status(500).json({ error: 'Error executing credit bureau script', details: error2.message });
//                                 }

//                                 const jsonPath2 = path.join(outputpath, 'assets', `uid-${userId}`, `pid-${uniquedId}`, `credit_report-combined_manifest.json`);

//                                 fs.readFile(jsonPath2, 'utf8', async (err2, data2) => {
//                                     if (err2) {
//                                         console.error('Error reading second JSON:', err2);
//                                         return res.status(500).json({ error: 'Could not read credit report JSON output' });
//                                     }

//                                     try {
//                                         const parsedData3 = JSON.parse(data2);
//                                         console.log('Credit Report parsedData:', parsedData3);

//                                         await signIn.updateOne(
//                                             { _id: userId },
//                                             { $push: { 'file_response.creditBureau': parsedData3 } }
//                                         );

//                                         return res.status(200).json({ answer: parsedData3, uniquedId });


//                                     } catch (parseErr2) {
//                                         console.error('Error parsing credit report JSON:', parseErr2);
//                                         return res.status(500).json({ error: 'Error parsing credit report', details: parseErr2.message });
//                                     }
//                                 });
//                             });



//                         } catch (parseErr2) {
//                             console.error('Error parsing credit report JSON:', parseErr2);
//                             return res.status(500).json({ error: 'Error parsing credit report', details: parseErr2.message });
//                         }
//                     });
//                 });

//             } catch (parseErr) {
//                 console.error('Error parsing bank statement JSON:', parseErr);
//                 return res.status(500).json({ error: 'Error parsing bank statement', details: parseErr.message });
//             }
//         });
//     });
// };



import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import signIn from '../models/signin.models.js';
import util from 'util';

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputpath = path.join(__dirname, '../');

const getPythonCommand = (script, filePath, userId, processId, domain) => {
    const pythonInterpreter = domain === "localhost:5173"
        ? 'C:\\smfgIndiaUpdate\\server\\smfgUpdateEnv\\Scripts\\python.exe'
        : 'python3.11';

    return `${pythonInterpreter} ${script} --file_path "${filePath}" --uuid "${userId}" --process_id "${processId}"`;
};

const readJson = async (userId, processId, filename) => {
    const jsonPath = path.join(outputpath, 'assets', `uid-${userId}`, `pid-${processId}`, filename);
    const data = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(data);
};

// export const startLoanForm = async (req, res) => {
//     try {
//         const {
//             bankStatementpdfPath,
//             idProofpdfPath,
//             creditBureopdfPath,
//             userId,
//             domain,
//             type
//         } = req.body;

//         const uniqueId = uuidv4();

//         const idCommand = getPythonCommand('main_id_manger.py', idProofpdfPath, userId, uniqueId, domain);
//         console.log(`Executing: ${idCommand}`);
//         await execPromise(idCommand);

//         const idData = await readJson(userId, uniqueId, 'id_proof-combined_manifest.json');
//         await signIn.updateOne({ _id: userId }, { $push: { 'file_response.idProof': idData } });

//         const bankCommand = getPythonCommand('main_bank_statement_manger.py', bankStatementpdfPath, userId, uniqueId, domain);
//         console.log(`Executing: ${bankCommand}`);
//         await execPromise(bankCommand);

//         const bankData = await readJson(userId, uniqueId, 'bank_statement-combined_manifest.json');
//         await signIn.updateOne({ _id: userId }, { $push: { 'file_response.bankStatement': bankData } });

//         const creditCommand = getPythonCommand('main_credit_buero_manger.py', creditBureopdfPath, userId, uniqueId, domain);
//         console.log(`Executing: ${creditCommand}`);
//         await execPromise(creditCommand);

//         const creditData = await readJson(userId, uniqueId, 'credit_report-combined_manifest.json');
//         await signIn.updateOne({ _id: userId }, { $push: { 'file_response.creditBureau': creditData } });

//         return res.status(200).json({ answer: creditData, uniqueId });

//     } catch (error) {
//         console.error('Error processing loan form:', error);
//         return res.status(500).json({ error: 'Failed to process loan form', details: error.message });
//     }
// };


export const startLoanForm = async (req, res) => {
    try {
        const {
            bankStatementpdfPath,
            idProofpdfPath,
            creditBureopdfPath,
            userId,
            domain,
            type
        } = req.body;

        const uniqueId = uuidv4();

        if (type === 'idProof') {
            const idCommand = getPythonCommand('main_id_manger.py', idProofpdfPath, userId, uniqueId, domain);
            console.log(`Executing: ${idCommand}`);
            await execPromise(idCommand);

            const idData = await readJson(userId, uniqueId, 'id_proof-combined_manifest.json');
            await signIn.updateOne({ _id: userId }, { $push: { 'file_response.idProof': idData } });

            return res.status(200).json({ answer: idData, uniqueId });
        }

        if (type === 'bankStatement') {
            const bankCommand = getPythonCommand('main_bank_statement_manger.py', bankStatementpdfPath, userId, uniqueId, domain);
            console.log(`Executing: ${bankCommand}`);
            await execPromise(bankCommand);

            const bankData = await readJson(userId, uniqueId, 'bank_statement-combined_manifest.json');
            await signIn.updateOne({ _id: userId }, { $push: { 'file_response.bankStatement': bankData } });

            return res.status(200).json({ answer: bankData, uniqueId });
        }

        if (type === 'creditBureau') {
            const creditCommand = getPythonCommand('main_credit_buero_manger.py', creditBureopdfPath, userId, uniqueId, domain);
            console.log(`Executing: ${creditCommand}`);
            await execPromise(creditCommand);

            const creditData = await readJson(userId, uniqueId, 'credit_report-combined_manifest.json');
            await signIn.updateOne({ _id: userId }, { $push: { 'file_response.creditBureau': creditData } });

            return res.status(200).json({ answer: creditData, uniqueId });
        }

        return res.status(400).json({ error: 'Invalid type provided' });

    } catch (error) {
        console.error('Error processing loan form:', error);
        return res.status(500).json({ error: 'Failed to process loan form', details: error.message });
    }
};

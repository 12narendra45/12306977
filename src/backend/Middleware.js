import axios from "axios";

const LOG_API_URL = "http://20.244.56.144/eva1uation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuYXJlbmRyYWNoYWtrYTMzQGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3NDY5MSwiaWF0IjoxNzUyNDczNzkxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDgwMDY0MGQtMjE2Ny00ODQ1LWI1ZmYtNzUyNmZiNjUwODE1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiY2ggdmVua2F0YSBuYXJlbmRyYSIsInN1YiI6ImZkOTU0ZjI3LWYxY2UtNDY1OC05ODRkLTM0MGUzZGQ5ZGZkNSJ9LCJlbWFpbCI6Im5hcmVuZHJhY2hha2thMzNAZ21haWwuY29tIiwibmFtZSI6ImNoIHZlbmthdGEgbmFyZW5kcmEiLCJyb2xsTm8iOiIxMjMwNjk3NyIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6ImZkOTU0ZjI3LWYxY2UtNDY1OC05ODRkLTM0MGUzZGQ5ZGZkNSIsImNsaWVudFNlY3JldCI6IlprVFdnQVVNRkF0SHdVS2EifQ.YNsHJ9UFdm1xzWi2TimKFWw80Se0Wqm4jTEk6bZchM4";

const validStacks = ["backend", "frontend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];
const validPackages = [
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
  "auth", "config", "middleware", "utils"
];

async function Log(stack, level, pkg, message) {
  try {
    if (!validStacks.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!validLevels.includes(level)) throw new Error(`Invalid level: ${level}`);
    if (!validPackages.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);

    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}` 
      },
    });
    if (response.status === 200) {
      console.log("Log sent:", response.data.logID);
    } else {
      console.warn("Log failed with status:", response.status);
    }
  } catch (err) {
    console.error("Logging Error:", err.message);
  }
}

export { Log };

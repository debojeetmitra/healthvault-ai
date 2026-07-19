<div align="center">

# HealthVault AI

*A privacy-first platform on Midnight where patients own their records, control access, and get AI-powered health summaries.*

</div>

---

## Problem Statement 

Patient medical records are spread across different hospitals and clinics, often leading to:
* Incomplete medical histories
* Patients having to carry physical paper files or search through old emails for test results
* Poor data privacy since patients do not actually own or control their medical data
* Extra time spent by doctors trying to review long, complicated lab reports during appointments

---

## Concept of our project 

HealthVault AI is a secure health platform that puts patients in control of their own data.

The project focuses on three main ideas:
* **Patient Ownership**: Medical records are kept in a single secure vault owned by the patient, not the hospital.
* **Flexible Access:** Documents can be uploaded easily by either the patient or their healthcare provider.
* **Complete Privacy:** Built on Midnight to ensure only people chosen by the patient can view the records.
* **AI Assistance:** A smart assistant that summarizes complex medical reports into quick, helpful summaries for doctors.

---

## System Architecture 
```text
Hospitals or patients upload medical documents directly to the vault.
      │
      ▼
The data is protected by Midnight's privacy network, ensuring only authorized people can see it.
      │
      ▼
When visiting a new doctor, the patient grants temporary access.
      │
      ▼
The doctor can instantly view the history, while a built-in AI assistant summarizes the long records into clear, quick insights.
    
```


## Installation 

## Installation 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/debojeetmitra/healthvault-ai.git
   cd healthvault-ai
---

## Key Features 

* **Patient-Owned Data Vault**: Patients have permanent ownership of their own medical records. Instead of files being scattered across separate hospital databases, all records are stored in a single, secure folder controlled entirely by the user.
* **Consent-Based Access Control**: Built on the Midnight network to ensure strict privacy. Healthcare providers cannot view any documents without sending a request, which the patient must explicitly approve. Access can be revoked by the patient at any time.
* **Automated AI Summaries**: Integrates Google Gemini AI to assist busy medical professionals. Instead of requiring doctors to read through long, unorganized medical files or PDFs, the AI extracts key vitals, trends, and critical warnings in seconds.
* **Secure Cloud Storage**: All uploaded medical documents are hosted using secure cloud infrastructure via Cloudinary, ensuring that sensitive files are protected against unauthorized access while remaining quickly retrievable for approved users.

---

## Tech Stack 

## Proposed Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), Tailwind CSS, shadcn/ui |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | JWT Authentication |
| **AI** | Google Gemini API |
| **Blockchain** | Midnight |
| **Storage** | Cloudinary (for medical reports) |
| **Deployment** | Frontend (Vercel), Backend  (Render) |

## Team Members 

| Name | Core Focus & Responsibilities |
| :--- | :--- |
| **Debojeet** | Frontend, Backend APIs, Database Design, Gemini AI, & Deployment |
| **Yeshaswini** | Midnight Blockchain, Smart Contracts, Wallet, & Permission Integration |
| **Paramita** | UI Improvements, Testing & Documentation|


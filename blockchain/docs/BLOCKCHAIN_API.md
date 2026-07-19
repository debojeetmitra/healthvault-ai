# HealthVault AI Blockchain API

## Patient

### registerPatient

Input:
- patientId
- walletAddress

Output:
- success
- transactionHash

---

## Doctor

### registerDoctor

Input:
- doctorId
- walletAddress
- licenseNumber

Output:
- success
- transactionHash

---

## MedicalReport

### registerMedicalReport

Input:
- reportId
- patientId
- reportHash

Output:
- success
- transactionHash

---

## Permission

### grantPermission

Input:
- patientId
- doctorId
- reportId

Output:
- success
- transactionHash

### revokePermission

Input:
- patientId
- doctorId
- reportId

Output:
- success
- transactionHash

### checkPermission

Input:
- patientId
- doctorId
- reportId

Output:
- true / false
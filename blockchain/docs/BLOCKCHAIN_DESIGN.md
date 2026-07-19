# HealthVault AI Blockchain Design

## Smart Contract
HealthVaultAI.compact

## On-Chain Entities

### Patient
- patientId
- walletAddress

### Doctor
- doctorId
- walletAddress
- licenseNumber

### MedicalReport
- reportId
- patientId
- reportHash
- uploadedAt

### Permission
- patientId
- doctorId
- reportId
- status
- grantedAt
- revokedAt

## Planned Circuits

- initialize()
- registerPatient()
- registerDoctor()
- registerMedicalReport()
- grantPermission()
- revokePermission()
- checkPermission()
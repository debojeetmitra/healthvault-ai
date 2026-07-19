export async function grantPermission(
  patientId: string,
  doctorId: string,
  reportId: string
): Promise<string> {
  // TODO: Replace this with the real Midnight contract call.
  console.log("Grant Permission:", {
    patientId,
    doctorId,
    reportId,
  });

  // Temporary transaction hash
  return `midnight-tx-${Date.now()}`;
}

export async function revokePermission(
  patientId: string,
  doctorId: string,
  reportId: string
): Promise<string> {
  // TODO: Replace this with the real Midnight contract call.
  console.log("Revoke Permission:", {
    patientId,
    doctorId,
    reportId,
  });

  // Temporary transaction hash
  return `midnight-tx-${Date.now()}`;
}
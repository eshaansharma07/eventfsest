import QRCode from 'qrcode';

export const generateQRCodeDataUrl = async (payload) => QRCode.toDataURL(payload);

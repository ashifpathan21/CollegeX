const emailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333;">Welcome to CollegeX</h2>
        <p style="font-size: 16px; color: #555555;">Thank you for signing up on our platform. To verify your email address, please use the OTP below:</p>
        <div style="font-size: 32px; font-weight: bold; color: #2d89ff; margin: 20px 0;">${otp}</div>
        <p style="font-size: 14px; color: #888888;">This OTP is valid for only 10 minutes. Please do not share it with anyone.</p>
        <p style="font-size: 14px; color: #888888;">If you did not request this, you can safely ignore this email.</p>
        <br />
        <p style="font-size: 14px; color: #333333;">Best regards,</p>
        <p style="font-size: 14px; color: #333333;">Team CollegeX</p>
      </div>
    </div>
  `;
};

export default emailTemplate;

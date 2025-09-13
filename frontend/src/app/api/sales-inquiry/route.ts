import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface SalesInquiryData {
  name: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: SalesInquiryData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'company', 'companySize'];
    for (const field of requiredFields) {
      if (!data[field as keyof SalesInquiryData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Sales Inquiry from Twinly Website

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Company: ${data.company}
- Company Size: ${data.companySize}

Submitted at: ${new Date().toLocaleString()}
    `;

    // For now, we'll log the data and return success
    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer with SMTP
    
    console.log('Sales Inquiry Received:', {
      ...data,
      timestamp: new Date().toISOString()
    });

    // Send email using Nodemailer
    try {
      // For now, we'll use a simple approach - you can set up Gmail later
      // This will work with any SMTP service
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: 'mohid2007zk@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD || 'your_app_password_here',
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER || 'mohid2007zk@gmail.com',
        to: 'mohid2007zk@gmail.com',
        subject: 'New Sales Inquiry - Twinly',
        text: emailContent,
        html: `
          <h2>New Sales Inquiry from Twinly Website</h2>
          <h3>Contact Information:</h3>
          <ul>
            <li><strong>Name:</strong> ${data.name}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.phone}</li>
            <li><strong>Company:</strong> ${data.company}</li>
            <li><strong>Company Size:</strong> ${data.companySize}</li>
          </ul>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to mohid2007zk@gmail.com');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, still save to CSV
    }

    // Save to CSV file
    const fs = require('fs');
    const path = require('path');
    
    const csvPath = path.join(process.cwd(), 'sales-inquiries.csv');
    const csvRow = `${data.name},${data.email},${data.phone},${data.company},${data.companySize},${new Date().toISOString()}\n`;
    
    try {
      // Check if file exists, if not create header
      if (!fs.existsSync(csvPath)) {
        const header = 'Name,Email,Phone,Company,Company Size,Submitted At\n';
        fs.writeFileSync(csvPath, header);
      }
      
      fs.appendFileSync(csvPath, csvRow);
      console.log('Data saved to CSV file:', csvPath);
    } catch (error) {
      console.error('CSV save error:', error);
    }

    return NextResponse.json(
      { message: 'Sales inquiry submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing sales inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

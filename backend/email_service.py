import smtplib
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

def send_contact_notification(contact_data: dict) -> bool:
    """
    Send email notification when a contact form is submitted.
    Uses Gmail SMTP with App Password.
    """
    gmail_user = os.environ.get('GMAIL_USER')
    gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
    notification_email = os.environ.get('NOTIFICATION_EMAIL')
    
    if not all([gmail_user, gmail_password, notification_email]):
        logger.error("Email configuration missing")
        return False
    
    # Create HTML email content
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #0A192F 0%, #050d1a 100%); padding: 30px; text-align: center; }}
            .header h1 {{ color: #D4AF37; margin: 0; font-family: 'Playfair Display', serif; }}
            .content {{ background: #f9fafb; padding: 30px; }}
            .field {{ margin-bottom: 15px; padding: 15px; background: #fff; border-left: 4px solid #D4AF37; }}
            .field-label {{ font-weight: 700; color: #0A192F; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }}
            .field-value {{ color: #333; font-size: 16px; margin-top: 5px; }}
            .footer {{ background: #0A192F; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>RUSHABH VENTURES</h1>
                <p style="color: #D4AF37; margin-top: 10px;">New Contact Form Submission</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="field-label">Name</div>
                    <div class="field-value">{contact_data.get('name', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="field-label">Company Name</div>
                    <div class="field-value">{contact_data.get('company_name', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="field-label">Annual Turnover</div>
                    <div class="field-value">{contact_data.get('annual_turnover', 'N/A')} Crores</div>
                </div>
                <div class="field">
                    <div class="field-label">Mobile Number</div>
                    <div class="field-value">{contact_data.get('mobile_number', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value">{contact_data.get('email', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="field-label">Message</div>
                    <div class="field-value">{contact_data.get('message', 'No message provided')}</div>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated notification from Rushabh Ventures website.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Create message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"New Contact: {contact_data.get('name', 'Unknown')} - {contact_data.get('company_name', 'Unknown Company')}"
    msg['From'] = gmail_user
    msg['To'] = notification_email
    
    # Plain text version
    plain_text = f"""
    New Contact Form Submission - Rushabh Ventures
    
    Name: {contact_data.get('name', 'N/A')}
    Company Name: {contact_data.get('company_name', 'N/A')}
    Annual Turnover: {contact_data.get('annual_turnover', 'N/A')} Crores
    Mobile Number: {contact_data.get('mobile_number', 'N/A')}
    Email: {contact_data.get('email', 'N/A')}
    Message: {contact_data.get('message', 'No message provided')}
    """
    
    msg.attach(MIMEText(plain_text, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        # Connect to Gmail SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, notification_email, msg.as_string())
        server.quit()
        logger.info(f"Email notification sent successfully for contact: {contact_data.get('name')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False


def send_application_notification(application_data: dict) -> bool:
    """
    Send email notification when an application form is submitted (homepage form).
    """
    gmail_user = os.environ.get('GMAIL_USER')
    gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
    notification_email = os.environ.get('NOTIFICATION_EMAIL')
    
    if not all([gmail_user, gmail_password, notification_email]):
        logger.error("Email configuration missing")
        return False
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%); padding: 30px; text-align: center; }}
            .header h1 {{ color: #000; margin: 0; font-family: 'Playfair Display', serif; }}
            .content {{ background: #f9fafb; padding: 30px; }}
            .field {{ margin-bottom: 15px; padding: 15px; background: #fff; border-left: 4px solid #0A192F; }}
            .field-label {{ font-weight: 700; color: #0A192F; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }}
            .field-value {{ color: #333; font-size: 16px; margin-top: 5px; }}
            .highlight {{ background: #0A192F; color: #D4AF37; padding: 20px; text-align: center; margin-top: 20px; }}
            .footer {{ background: #0A192F; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>RUSHABH VENTURES</h1>
                <p style="color: #000; margin-top: 10px; font-weight: 600;">New IPO Evaluation Application</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="field-label">Applicant Name</div>
                    <div class="field-value">{application_data.get('name', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="field-label">Company Name</div>
                    <div class="field-value">{application_data.get('company_name', 'N/A')}</div>
                </div>
                <div class="field">
                    <div class="field-label">Annual Turnover</div>
                    <div class="field-value">₹{application_data.get('annual_turnover', 'N/A')} Crores</div>
                </div>
                <div class="field">
                    <div class="field-label">Mobile Number</div>
                    <div class="field-value">{application_data.get('mobile_number', 'N/A')}</div>
                </div>
                <div class="highlight">
                    <p style="margin: 0; font-size: 14px;">A potential client is waiting for your response!</p>
                </div>
            </div>
            <div class="footer">
                <p>This is an automated notification from Rushabh Ventures website.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"🎯 New IPO Application: {application_data.get('company_name', 'Unknown')} - ₹{application_data.get('annual_turnover', 'N/A')} Cr"
    msg['From'] = gmail_user
    msg['To'] = notification_email
    
    plain_text = f"""
    New IPO Evaluation Application - Rushabh Ventures
    
    Applicant Name: {application_data.get('name', 'N/A')}
    Company Name: {application_data.get('company_name', 'N/A')}
    Annual Turnover: ₹{application_data.get('annual_turnover', 'N/A')} Crores
    Mobile Number: {application_data.get('mobile_number', 'N/A')}
    
    This applicant is interested in IPO evaluation services.
    """
    
    msg.attach(MIMEText(plain_text, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, notification_email, msg.as_string())
        server.quit()
        logger.info(f"Application notification sent for: {application_data.get('company_name')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send application notification: {str(e)}")
        return False

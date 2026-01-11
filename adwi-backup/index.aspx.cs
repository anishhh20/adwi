using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Mail;

public partial class index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void submit_Click(object sender, EventArgs e)
    {

        string Name =  inputName.Value;
        string Email = inputEmail.Value;
        string CompanyName = inputCompanyName.Value;
        string Phone = inputPhone.Value;
        string QuestionName = inputQuestionName.Value;
        string Message = textarea.InnerText;

        MailMessage mailMessage = new MailMessage();
        mailMessage.To.Add("cvadwitech@gmail.com");
        mailMessage.From = new MailAddress(Email);
        mailMessage.Subject = "From website";//Enter Mail Subject
        mailMessage.Body = "Hello,\n\n email from website!";     
        SmtpClient smtpClient = new SmtpClient("smtp.mail.adwitechnologies.com");
        smtpClient.Send(mailMessage);
        Response.Write("E-mail sent!");
    }
}
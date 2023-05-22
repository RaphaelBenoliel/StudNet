/* eslint-disable no-tabs */
const EmailTemplate = (password, firstName, lastName) => `
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title></title>
	<style type="text/css">
		/* Gmail removes the body tag from email, so we will create a fallback table (#body) with the same properties. */
		body,#body {
			width:100% !important;
			height:100% !important;
			margin:0;
			padding:0;
		}
		table,td {
			border-collapse:collapse;
		}
		img {
			border:0 none;
			max-width:100%;
			line-height:100%;
			outline:none;
			display:block;
			text-decoration:none;
			-ms-interpolation-mode: bicubic;
		}
		a img {
			border: 0 none;
		}
        strong {
            color: #2da042;
          }
		/* Native Blue Links on iOS (https://litmus.com/blog/update-banning-blue-links-on-ios-devices) */
		a[href^="tel"],a[href^="sms"] {
			text-decoration:none;
			color:[value];
			pointer-events:none;
			cursor:default;
		}
	</style>
</head>
<body>
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="body">
	<tr>
		<td align="center" valign="top">
			<table border="0" cellpadding="0" cellspacing="0" width="600">
				<tr>
					<td align="center" valign="top">
                    <h2>Password Recovery</h2>
                    <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
                    <p>This is your password: </p>
                    <h3><strong>${password}</strong></h3>
                    <p>If you didn't request a password recovery, please ignore this email.</p>
                    <div class="message">
                      <p>Best regards,</p>
                      <p>Your StudNet Team</p>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</body>
</html>
    `;

export default EmailTemplate;

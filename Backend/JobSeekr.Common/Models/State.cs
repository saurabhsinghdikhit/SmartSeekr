using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Common.Models
{
    public class State
    {

        /// <summary>
        ///     Gets a value indicating whether this instance has warning error.
        /// </summary>
        /// <value>
        ///     <c>true</c> if this instance has warning error; otherwise, <c>false</c>.
        /// </value>
        public bool HasGeneralError { get; set; }

        /// <summary>
        /// Gets a value indicating whether this instance has security error.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance has security error; otherwise, <c>false</c>.
        /// </value>
        public bool HasSecurityError { get; set; }

        /// <summary>
        /// Gets a value indicating whether this instance has warning error.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance has warning error; otherwise, <c>false</c>.
        /// </value>
        public bool HasWarningError { get; set; }

        /// <summary>
        /// Gets a value indicating whether this instance has success.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance has success; otherwise, <c>false</c>.
        /// </value>
        public bool HasSuccess { get; set; }

        /// <summary>
        /// Gets or sets the success message.
        /// </summary>
        /// <value>
        /// The success message.
        /// </value>
        public string SuccessMessage { get; set; }

        /// <summary>
        /// Gets or sets the warning message.
        /// </summary>
        /// <value>
        /// The warning message.
        /// </value>
        public string WarningMessage { get; set; }

        /// <summary>
        /// Gets or sets the error message.
        /// </summary>
        /// <value>
        /// The error message.
        /// </value>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// Gets or sets the security message.
        /// </summary>
        /// <value>
        /// The security message.
        /// </value>
        public string SecurityMessage { get; set; }

        /// <summary>
        /// Gets or sets the status code.
        /// </summary>
        /// <value>
        /// The status code.
        /// </value>
        public int StatusCode { get; set; }

        /// <summary>
        /// Sets the success message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="successStatusCode"></param>
        public void SetSuccessMessage(string message, int successStatusCode = 0)
        {
            HasSuccess = true;
            SuccessMessage = message;
            StatusCode = successStatusCode;
        }

        /// <summary>
        /// Sets the error message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="errorStatusCode"></param>
        public void SetErrorMessage(string message, int errorStatusCode = 0)
        {
            ErrorMessage = message;
            HasGeneralError = true;
            StatusCode = errorStatusCode;

        }

        /// <summary>
        /// Sets the warning message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="warningStatusCode"></param>
        public void SetWarningMessage(string message, int warningStatusCode = 0)
        {
            WarningMessage = message;
            HasWarningError = true;
            StatusCode = warningStatusCode;
        }

        /// <summary>
        /// Sets the security message.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="securityStatusCode"></param>
        public void SetSecurityMessage(string message, int securityStatusCode = 0)
        {
            SecurityMessage = message;
            HasSecurityError = true;
            StatusCode = securityStatusCode;
        }

        /// <summary>
        /// Gets the general message.
        /// </summary>
        /// <returns></returns>
        public string GetGeneralMessage()
        {
            if (!string.IsNullOrEmpty(SuccessMessage))
            {
                return SuccessMessage;
            }
            if (!string.IsNullOrEmpty(WarningMessage))
            {
                return WarningMessage;
            }
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                return ErrorMessage;
            }
            if (!string.IsNullOrEmpty(SecurityMessage))
            {
                return SecurityMessage;
            }
            return string.Empty;
        }

        /// <summary>
        /// Determines whether this instance is valid.
        /// </summary>
        /// <returns></returns>
        public bool IsValid()
        {
            if (!HasGeneralError && !HasWarningError)
            {
                return true;
            }
            return false;
        }

        public bool IsError()
        {
            if (HasGeneralError || HasWarningError)
            {
                return true;
            }
            return false;
        }
    }
}

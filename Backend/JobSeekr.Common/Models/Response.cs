using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace JobSeekr.Common.Models
{
    public class Response<T>
    {
        public string Version { get; set; }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        public T Result { get; set; }

        public State StateModel { get; set; }

        public bool IsError { get; set; }

        public Response()
        {
            StateModel = new State();
            Version = "1.0.0.0";
        }

        public void ResponseMessage(int code, State stateModel)
        {
            string message;
            if (code == (int)HttpStatusCode.OK)
                message = "Request successful.";
            else if (code == (int)HttpStatusCode.NotFound)
                message = "The specified URI does not exist. Please verify and try again.";
            else if (code == (int)HttpStatusCode.NoContent)
                message = "The specified URI does not contain any content.";
            else
                message = "Your request cannot be processed. Please contact a support.";


            StateModel = stateModel;
            IsError = !stateModel.IsValid();
            Message = message;
            StatusCode = code;
        }
    }
}

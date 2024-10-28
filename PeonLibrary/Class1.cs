using Microsoft.Xrm.Sdk;
using System;
using System.ServiceModel;

namespace GSTLoggerPlugin
{
    public class Class1 : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Get the tracing service for debugging
            ITracingService tracingService =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Obtain the execution context
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            // Check if the target entity is available in input parameters
            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                // Get the target entity from the context
                Entity entity = (Entity)context.InputParameters["Target"];

                try
                {
                    // Check and log the "gst_name" attribute
                    if (entity.Contains("gst_name") && entity["gst_name"] != null)
                    {
                        string gstName = entity["gst_name"].ToString();
                        tracingService.Trace("GST Name: {0}", gstName);
                    }
                    else
                    {
                        tracingService.Trace("GST Name attribute is not present or has no value.");
                    }

                    // Check and log the "gst_age" attribute
                    if (entity.Contains("gst_age") && entity["gst_age"] != null)
                    {
                        int gstAge = (int)entity["gst_age"];
                        tracingService.Trace("GST Age: {0}", gstAge);
                    }
                    else
                    {
                        tracingService.Trace("GST Age attribute is not present or has no value.");
                    }

                    // Check and log the "gst_email" attribute
                    if (entity.Contains("gst_email") && entity["gst_email"] != null)
                    {
                        string gstEmail = entity["gst_email"].ToString();
                        tracingService.Trace("GST Email: {0}", gstEmail);
                    }
                    else
                    {
                        tracingService.Trace("GST Email attribute is not present or has no value.");
                    }

                    // Check and log the "gst_address" attribute
                    if (entity.Contains("gst_address") && entity["gst_address"] != null)
                    {
                        string gstAddress = entity["gst_address"].ToString();
                        tracingService.Trace("GST Address: {0}", gstAddress);
                    }
                    else
                    {
                        tracingService.Trace("GST Address attribute is not present or has no value.");
                    }
                }
                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in the LogGSTAttributes plugin.", ex);
                }
                catch (Exception ex)
                {
                    tracingService.Trace("LogGSTAttributes Plugin: {0}", ex.ToString());
                    throw;
                }
            }
            else
            {
                // Log if Target entity is not found in InputParameters
                tracingService.Trace("No Target entity found in InputParameters.");
            }
        }
    }
}

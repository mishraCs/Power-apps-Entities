using Microsoft.Xrm.Sdk;
using System;

namespace Myplugincode
{
    public class ComputerPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            if (!context.InputParameters.Contains("Target") || !(context.InputParameters["Target"] is Entity entity))
            {
                tracingService.Trace("Target entity is missing or not of type Entity.");
                return;
            }

            string name = entity.Contains("gst_name") && entity["gst_name"] != null && entity["gst_name"] != DBNull.Value
                ? entity.GetAttributeValue<string>("gst_name")
                : null;

            string origin = entity.Contains("gst_origin") && entity["gst_origin"] != null && entity["gst_origin"] != DBNull.Value
                ? entity.GetAttributeValue<string>("gst_origin")
                : null;

            EntityReference computerOwner = entity.Contains("gst_ownername") && entity["gst_ownername"] != null && entity["gst_ownername"] != DBNull.Value
                ? entity.GetAttributeValue<EntityReference>("gst_ownername")
                : null;

            tracingService.Trace($"Name: {name ?? "NULL"}");
            tracingService.Trace($"Origin: {origin ?? "NULL"}");
            tracingService.Trace($"Computer Owner ID: {computerOwner?.Id ?? Guid.Empty}, Logical Name: {computerOwner?.LogicalName ?? "NULL"}");

            Entity backup = new Entity("gst_backupcomputer");

            if (!string.IsNullOrEmpty(name))
            {
                backup["gst_name"] = name;
                tracingService.Trace("Name copied to backup entity.");
            }

            if (!string.IsNullOrEmpty(origin))
            {
                backup["gst_origin"] = origin;
                tracingService.Trace("Origin copied to backup entity.");
            }

            if (computerOwner != null && !string.IsNullOrEmpty(computerOwner.LogicalName))
            {
                backup["gst_ownercomputer"] = new EntityReference(computerOwner.LogicalName, computerOwner.Id);
                tracingService.Trace("Computer Owner reference copied to backup entity.");
            }
            else
            {
                tracingService.Trace("Computer Owner is null or invalid and will not be set on the backup entity.");
            }

            try
            {
                service.Create(backup);
                tracingService.Trace("Backup entity created successfully.");
            }
            catch (Exception ex)
            {
                tracingService.Trace("Error creating backup entity: " + ex.Message);
                throw new InvalidPluginExecutionException("An error occurred while creating the backup entity.", ex);
            }
        }
    }
}

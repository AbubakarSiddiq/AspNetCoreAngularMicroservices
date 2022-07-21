namespace ClientApp.Services
{
    /// <summary>
    /// Service for getting the service options.
    /// </summary>
    public interface IServiceOptionsService
    {
        /// <summary>
        /// Gets the service options.
        /// </summary>
        /// <returns>
        /// The service options.
        /// </returns>
        ServiceOptions GetServiceOptions();
    }
}

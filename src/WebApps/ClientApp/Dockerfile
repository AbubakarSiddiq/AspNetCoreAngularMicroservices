#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["WebApps/ClientApp/ClientApp.csproj", "WebApps/ClientApp/"]
RUN dotnet restore "WebApps/ClientApp/ClientApp.csproj"
COPY . .
WORKDIR "/src/WebApps/ClientApp"
RUN dotnet build "ClientApp.csproj" -c Release -o /app/build

FROM node:12.18-alpine AS client 
ARG skip_client_build=false 
WORKDIR /app 
COPY ["WebApps/ClientApp/ClientApp/", "."]
RUN  if [ "$skip_client_build" = "true" ] ; then echo "Skipping npm install" ; else npm install ; fi
RUN  if [ "$skip_client_build" = "true" ] ; then mkdir -p dist ; else npm run-script build -- --prod ; fi

FROM build AS publish
RUN dotnet publish "ClientApp.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

COPY --from=client /app/dist /app/dist
ENTRYPOINT ["dotnet", "ClientApp.dll"]

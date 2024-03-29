﻿using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityServer
{
    public class Config
    {
        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "catalogClient",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { "catalogAPI" }
                },
                new Client
                   {
                       ClientId = "angular_client",
                       ClientName = "Angular Web App",
                       AllowedGrantTypes = GrantTypes.Code,
                       //AllowedGrantTypes = GrantTypes.Hybrid,
                       RequirePkce = false,
                       AllowRememberConsent = false,
                       RedirectUris = new List<string>()
                       {
                           //"https://localhost:5007/signin-oidc"
                           "http://localhost:4200/signin-oidc"
                       },
                       PostLogoutRedirectUris = new List<string>()
                       {
                           //"https://localhost:5007/signout-callback-oidc"
                           "http://localhost:4200/signout-callback-oidc"
                       },
                       ClientSecrets = new List<Secret>
                       {
                           new Secret("secret".Sha256())
                       },
                       AllowedScopes = new List<string>
                       {
                           IdentityServerConstants.StandardScopes.OpenId,
                           IdentityServerConstants.StandardScopes.Profile,
                           IdentityServerConstants.StandardScopes.Address,
                           IdentityServerConstants.StandardScopes.Email,
                           "catalogAPI",
                           "roles"
                       },
                       AllowedCorsOrigins = new List<string>()
                       {
                           "http://localhost:4200"
                       }
                   }
            };

        public static IEnumerable<ApiScope> ApiScopes =>
           new ApiScope[]
           {
               new ApiScope("catalogAPI", "Catalog API")
           };

        public static IEnumerable<ApiResource> ApiResources =>
          new ApiResource[]
          {
          };

        public static IEnumerable<IdentityResource> IdentityResources =>
          new IdentityResource[]
          {
              new IdentityResources.OpenId(),
              new IdentityResources.Profile(),
          };

        public static List<TestUser> TestUsers =>
            new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
                    Username = "abubakar",
                    Password = "abubakar",
                    Claims = new List<Claim>
                    {
                        new Claim(JwtClaimTypes.GivenName, "abubakar"),
                        new Claim(JwtClaimTypes.FamilyName, "abubakar")
                    }
                }
            };
    }
}

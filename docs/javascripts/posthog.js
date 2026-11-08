(function initializePostHog(documentObject, posthog) {
  const config = window.__DNSBUN_POSTHOG_CONFIG__;

  if (!config?.projectToken || !config?.apiHost) {
    return;
  }

  if (!posthog.__SV) {
    window.posthog = posthog;
    posthog._i = [];
    posthog.init = function init(projectToken, options, instanceName) {
      function addStubMethod(target, methodName) {
        const parts = methodName.split(".");

        if (parts.length === 2) {
          target = target[parts[0]];
          methodName = parts[1];
        }

        target[methodName] = function stubMethod() {
          target.push([methodName].concat(Array.prototype.slice.call(arguments)));
        };
      }

      const script = documentObject.createElement("script");
      script.type = "text/javascript";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.src = `${options.api_host.replace(
        ".i.posthog.com",
        "-assets.i.posthog.com",
      )}/static/array.js`;

      const firstScript = documentObject.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);

      let instance = posthog;

      if (instanceName !== undefined) {
        instance = posthog[instanceName] = [];
      } else {
        instanceName = "posthog";
      }

      instance.people = instance.people || [];
      Object.defineProperty(instance, "toString", {
        configurable: true,
        enumerable: true,
        value(includePeople) {
          let name = "posthog";

          if (instanceName !== "posthog") {
            name += `.${instanceName}`;
          }

          if (!includePeople) {
            name += " (stub)";
          }

          return name;
        },
        writable: true,
      });
      Object.defineProperty(instance.people, "toString", {
        configurable: true,
        enumerable: true,
        value() {
          return `${instance.toString(true)}.people (stub)`;
        },
        writable: true,
      });

      const methods = [
        "init",
        "capture",
        "register",
        "register_once",
        "register_for_session",
        "unregister",
        "unregister_for_session",
        "getFeatureFlag",
        "getFeatureFlagResult",
        "isFeatureEnabled",
        "reloadFeatureFlags",
        "updateEarlyAccessFeatureEnrollment",
        "getEarlyAccessFeatures",
        "on",
        "onFeatureFlags",
        "onSessionId",
        "getSurveys",
        "getActiveMatchingSurveys",
        "renderSurvey",
        "canRenderSurvey",
        "getNextSurveyStep",
        "identify",
        "setPersonProperties",
        "group",
        "resetGroups",
        "setPersonPropertiesForFlags",
        "resetPersonPropertiesForFlags",
        "setGroupPropertiesForFlags",
        "resetGroupPropertiesForFlags",
        "reset",
        "get_distinct_id",
        "getGroups",
        "get_session_id",
        "get_session_replay_url",
        "alias",
        "set_config",
        "startSessionRecording",
        "stopSessionRecording",
        "sessionRecordingStarted",
        "captureException",
        "loadToolbar",
        "get_property",
        "getSessionProperty",
        "createPersonProfile",
        "opt_in_capturing",
        "opt_out_capturing",
        "has_opted_in_capturing",
        "has_opted_out_capturing",
        "clear_opt_in_out_capturing",
        "debug",
      ];

      for (const method of methods) {
        addStubMethod(instance, method);
      }

      posthog._i.push([projectToken, options, instanceName]);
    };
    posthog.__SV = 1;
  }

  posthog.init(config.projectToken, {
    api_host: config.apiHost,
    defaults: "2026-08-30",
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_exceptions: true,
  });
})(document, window.posthog || []);

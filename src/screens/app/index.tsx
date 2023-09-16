import React, { Component } from "react";
import { Router } from "@figliolia/rn-navigation";
import { Feed } from "@screens/feed";
import { AuthenticatedRoute } from "@packages/components/authenticated-route";
import { CreatePost } from "@screens/create-post";
import { Settings } from "@screens/settings";
import { CoreTabs } from "@packages/core-layout/core-tabs";
import { CoreView } from "@packages/core-layout/core-view";

export class App extends Component {
  render() {
    return (
      <AuthenticatedRoute redirect="sign-up">
        <CoreView>
          <Router
            defaultRoute="feed"
            routes={[
              { name: "feed", component: Feed },
              { name: "profile", component: Settings },
              { name: "settings", component: Settings },
              { name: "create-post", component: CreatePost },
            ]}
          />
        </CoreView>
        <CoreTabs />
      </AuthenticatedRoute>
    );
  }
}

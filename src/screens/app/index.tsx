import React, { Component } from "react";
import { Router } from "@figliolia/rn-navigation";
import { Feed } from "@screens/feed";
import { Profile } from "@screens/profile";
import { Settings } from "@screens/settings";
import { Comments } from "@screens/comments";
import { CreatePost } from "@screens/create-post";
import { CoreTabs, CoreView } from "@packages/core-layout";
import { AuthenticatedRoute } from "@packages/components/authenticated-route";

export class App extends Component {
  render() {
    return (
      <AuthenticatedRoute redirect="sign-up">
        <CoreView>
          <Router
            defaultRoute="profile"
            routes={[
              { name: "feed", component: Feed },
              { name: "comments", component: Comments },
              { name: "profile", component: Profile },
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

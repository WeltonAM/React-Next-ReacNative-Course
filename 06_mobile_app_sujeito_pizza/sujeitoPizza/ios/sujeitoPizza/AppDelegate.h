#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTBridge.h>
#import <React/RCTRootView.h>
#import <ReactNativeVectorIcons/ReactNativeVectorIcons.h> 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  [ReactNativeVectorIcons bootstrap];

  return YES;
}
@interface AppDelegate : RCTAppDelegate

@end

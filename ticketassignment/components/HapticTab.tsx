/**
 * HapticTab Component
 *
 * Enhances bottom tab navigation with haptic feedback on iOS.
 * Wraps the standard bottom tab button with haptic feedback functionality.
 *
 * @module HapticTab
 */

import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

/**
 * HapticTab Component
 *
 * A wrapper for bottom tab buttons that adds haptic feedback on iOS.
 * Uses light impact feedback when pressing down on tab buttons.
 * No effect on Android or web platforms.
 *
 * @param {BottomTabBarButtonProps} props - Standard bottom tab button props
 * @returns {JSX.Element} A PlatformPressable component with haptic feedback
 */
export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
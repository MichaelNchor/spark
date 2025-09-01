import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

const SPARK = {
  gradient: ["#fd297b", "#ff5864", "#ff655b"],
  sub: "#374151",
  hint: "#6B7280",
  name: "#111827",
  line: "rgba(0,0,0,0.08)",
  purple: "#111827",
};

const ActionBtn = ({ color, bg, icon, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={{
      width: 72,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
      height: "100%",
      gap: 6,
    }}
  >
    <Ionicons name={icon} size={22} color={color} />
    <Text className="font-poppins-regular text-xs" style={{ color }}>{label}</Text>
  </TouchableOpacity>
);

/**
 * messageType: "text" | "image" | "video" | "voice" | "gif" | "sticker" | "location" | "link"
 * fromMe: if last message was sent by me -> adds "You:" prefix and receipt
 * isTyping: show "Typing…" pill (overrides preview text/icons)
 * draftText: optional "Draft — …" state
 * voiceDuration: "0:12" etc (when messageType="voice")
 */
const ChatProfileCard = ({
  id,
  user,
  lastMessage,
  timeLabel,
  unreadCount = 0,
  status = "sent", // "sent" | "delivered" | "read"
  muted,
  pinned,
  fromMe = false,
  messageType = "text",
  isTyping = false,
  draftText,
  voiceDuration, // e.g. "0:12"
  onPress,
  onLongPress,
  onPin,
  onMute,
  onArchive,
  onDelete,
}) => {
  const swipeRef = useRef(null);

  const RightActions = () => (
    <View style={{ flexDirection: "row" }}>
      <ActionBtn
        color="#fff"
        bg="#111827"
        icon="person-remove-outline"
        label="unmatch"
        onPress={() => {
          swipeRef.current?.close();
          onArchive?.(id);
        }}
      />
      <ActionBtn
        color="#fff"
        bg="#ef4444"
        icon="trash-outline"
        label="Delete"
        onPress={() => {
          swipeRef.current?.close();
          onDelete?.(id);
        }}
      />
    </View>
  );

  // const LeftActions = () => (
  //   <View style={{ flexDirection: "row" }}>
  //     <ActionBtn
  //       color="#111827"
  //       bg="#F3F4F6"
  //       icon={pinned ? "remove-circle" : "bookmark"}
  //       label={pinned ? "Unpin" : "Pin"}
  //       onPress={() => {
  //         swipeRef.current?.close();
  //         onPin?.(id);
  //       }}
  //     />
  //     <ActionBtn
  //       color="#111827"
  //       bg="#F3F4F6"
  //       icon={muted ? "volume-high" : "volume-mute"}
  //       label={muted ? "Unmute" : "Mute"}
  //       onPress={() => {
  //         swipeRef.current?.close();
  //         onMute?.(id);
  //       }}
  //     />
  //   </View>
  // );

  // Map message type to icon + default label
  const typeIcon =
    messageType === "image"
      ? "image"
      : messageType === "video"
        ? "videocam"
        : messageType === "voice"
          ? "mic"
          : messageType === "gif"
            ? "sparkles"
            : messageType === "sticker"
              ? "happy"
              : messageType === "location"
                ? "location"
                : messageType === "link"
                  ? "link"
                  : undefined;

  const typeLabel =
    messageType === "image"
      ? "Photo"
      : messageType === "video"
        ? "Video"
        : messageType === "voice"
          ? `Voice ${voiceDuration ?? ""}`.trim()
          : messageType === "gif"
            ? "GIF"
            : messageType === "sticker"
              ? "Sticker"
              : messageType === "location"
                ? "Location"
                : messageType === "link"
                  ? "Link"
                  : (lastMessage ?? "");

  let previewText = typeLabel;
  let previewColor = SPARK.sub;
  let showReceiptOnRight = unreadCount === 0;

  if (isTyping) {
    previewText = "Typing…";
    previewColor = SPARK.purple;
    showReceiptOnRight = false;
  } else if (draftText) {
    previewText = `Draft — ${draftText}`;
    // previewColor = "#D97706"; // amber-600
    showReceiptOnRight = false;
  } else if (fromMe && messageType === "text" && lastMessage) {
    previewText = `You: ${lastMessage}`;
  } else if (fromMe && messageType !== "text") {
    previewText = `You: ${typeLabel}`;
  }

  const receipt =
    status === "read" ? (
      <Ionicons name="checkmark-done" size={16} color="#3B82F6" />
    ) : status === "delivered" ? (
      <Ionicons name="checkmark-done" size={16} color={SPARK.hint} />
    ) : (
      <Ionicons name="checkmark" size={16} color={SPARK.hint} />
    );

  // Avatar source fallback
  const avatarSrc =
    user?.media?.[0]?.uri || user?.avatar || user?.image || undefined;

  return (
    <ReanimatedSwipeable
      ref={swipeRef}
      // renderLeftActions={LeftActions}
      renderRightActions={RightActions}
      overshootFriction={8}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          paddingVertical: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: "#cccccc",
          backgroundColor: "transparent",
        }}
      >
        <View
          className="shadow-slate-400"
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: "white",
            padding: 12,
          }}
        >
          {/* Avatar with ring + online dot */}
          <View>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 999,
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <Image
                source={avatarSrc ? { uri: avatarSrc } : undefined}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
            {user?.isOnline && (
              <View
                style={{
                  position: "absolute",
                  right: -1,
                  bottom: -1,
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  backgroundColor: "#22c55e",
                  borderWidth: 2,
                  borderColor: "#fff",
                }}
              />
            )}
          </View>

          {/* Center: name + preview */}
          <View style={{ flex: 1, gap: 6 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Text
                className="font-poppins-medium text-lg"
                numberOfLines={1}
                style={{
                  color: SPARK.name,
                  flexShrink: 1,
                }}
              >
                {user?.name}
                {/* {user?.age ? ` ${user.age}` : ""} */}
              </Text>
              {user?.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
              )}
              {/* {pinned && (
                <Ionicons name="bookmark" size={14} color={SPARK.hint} />
              )} */}
              {/* {muted && (
                <Ionicons name="volume-mute" size={14} color={SPARK.hint} />
              )} */}
            </View>

            {/* Message preview row */}
            <View
              style={{
                flexDirection: "row",
                gap: 1,
                marginTop: 2,
              }}
            >
              {/* tiny type icon (except pure text) */}
              {!isTyping &&
                !draftText &&
                messageType !== "text" &&
                typeIcon && (
                  <Ionicons name={typeIcon} size={16} color={SPARK.hint} style={{padding: 2}} />
                )}
              <Text
                className="font-poppins-regular text-base"
                numberOfLines={1}
                style={{ color: previewColor, fontSize: 13, flex: 1 }}
              >
                {previewText}
              </Text>
              {/* read receipts only when there is no unread bubble and not typing/draft */}
              {showReceiptOnRight && !isTyping && !draftText && receipt}
            </View>
          </View>

          {/* Right: time + unread badge */}
          <View style={{ alignItems: "flex-end", minWidth: 56, gap: 6 }}>
            <Text
              className="font-poppins-regular text-sm"
              style={{ color: SPARK.hint }}
            >
              {timeLabel}
            </Text>
            {unreadCount > 0 ? (
              <LinearGradient
                colors={SPARK.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  minWidth: 28,
                  alignItems: "center",
                }}
              >
                <Text
                  className="font-poppins-regular text-base"
                  style={{ color: "#fff" }}
                >
                  {unreadCount}
                </Text>
              </LinearGradient>
            ) : (
              <View style={{ height: 22 }} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};

export default ChatProfileCard;

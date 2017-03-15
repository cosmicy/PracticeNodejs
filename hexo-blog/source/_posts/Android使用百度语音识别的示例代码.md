---
title: Android使用百度语音识别的示例代码
date: 2017-03-14 09:23:55
tags: [Android,语音]
categories: [技术开发,Android]
---

转自：[链接](http://www.jb51.net/article/106299.htm?winzoom=1)

> 本篇文章主要介绍了Android使用百度语音识别的示例代码，详细介绍了使用百度语音识别，完成语音识别的功能，有兴趣的可以了解一下。

本文使用百度语音识别，完成语音识别的功能，使用百度语音识别，先要申请APP ID，这个直接到百度网站上有说明文档，本文不再赘述。申请之后，下载SDK包，按照百度官网要求，合并libs和res两个目录到项目中，然后在build.gradle(module:app)中的Android{...}下添加

```
sourceSets{
  main{
    jniLibs.srcDirs=['libs']
  }
}
```

这样， 百度语音识别的so文件才能正常使用。
Manifest文件中添加权限

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

然后还要在Manifest中添加

```xml
<!-- 请填写应用实际的APP_ID -->
<meta-data android:name="com.baidu.speech.APP_ID" android:value="APP ID"/>
<!-- 请填写应用实际的API_KEY -->
<meta-data android:name="com.baidu.speech.API_KEY" android:value="API_KEY"/>
<!-- 请填写应用实际的SECRET_KEY -->
<meta-data android:name="com.baidu.speech.SECRET_KEY" android:value="SECRET_KEY"/>

<service android:name="com.baidu.speech.VoiceRecognitionService" android:exported="false" />
```

其中的APP ID，API_KEY和SECRET_KEY替换为你申请的内容。
我们封装了一个工具类，用来使用语音识别

```java
package com.yjp.speechrecognizer;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.SpeechRecognizer;
import android.widget.Toast;

import com.baidu.speech.VoiceRecognitionService;

public class SpeechRecognizerTool implements RecognitionListener {

  public interface ResultsCallback {
    void onResults(String result);
  }

  private Context mContext;

  private SpeechRecognizer mSpeechRecognizer;

  private ResultsCallback mResultsCallback;

  public SpeechRecognizerTool(Context context) {
    mContext = context;
  }

  public synchronized void createTool() {
    if (null == mSpeechRecognizer) {

      // 创建识别器
      mSpeechRecognizer = SpeechRecognizer.createSpeechRecognizer(mContext,
          new ComponentName(mContext, VoiceRecognitionService.class));

      // 注册监听器
      mSpeechRecognizer.setRecognitionListener(this);
    }
  }

  public synchronized void destroyTool() {
    mSpeechRecognizer.stopListening();
    mSpeechRecognizer.destroy();
    mSpeechRecognizer = null;
  }

  // 开始识别
  public void startASR(ResultsCallback callback) {
    mResultsCallback = callback;

    Intent intent = new Intent();
    bindParams(intent);
    mSpeechRecognizer.startListening(intent);
  }

  //停止识别
  public void stopASR() {
    mSpeechRecognizer.stopListening();
  }

  private void bindParams(Intent intent) {
    // 设置识别参数
  }

  @Override
  public void onReadyForSpeech(Bundle params) {
    // 准备就绪
    Toast.makeText(mContext, "请开始说话", Toast.LENGTH_SHORT).show();
  }

  @Override
  public void onBeginningOfSpeech() {
    // 开始说话处理
  }

  @Override
  public void onRmsChanged(float rmsdB) {
    // 音量变化处理
  }

  @Override
  public void onBufferReceived(byte[] buffer) {
    // 录音数据传出处理
  }

  @Override
  public void onEndOfSpeech() {
    // 说话结束处理
  }

  @Override
  public void onError(int error) {
  }

  @Override
  public void onResults(Bundle results) {

    // 最终结果处理
    if (mResultsCallback != null) {
      String text = results.get(SpeechRecognizer.RESULTS_RECOGNITION)
          .toString().replace("]", "").replace("[", "");
      mResultsCallback.onResults(text);
    }
  }

  @Override
  public void onPartialResults(Bundle partialResults) {
    // 临时结果处理
  }

  @Override
  public void onEvent(int eventType, Bundle params) {
  }
}
```
MainActivity的界面如下
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:id="@+id/activity_main"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:paddingBottom="@dimen/activity_vertical_margin"
  android:paddingLeft="@dimen/activity_horizontal_margin"
  android:paddingRight="@dimen/activity_horizontal_margin"
  android:paddingTop="@dimen/activity_vertical_margin"
  android:orientation="vertical"
  android:gravity="center"
  tools:context="com.yjp.speechrecognizer.MainActivity">

  <Button
    android:id="@+id/startSpeechButton"
    android:layout_width="60dp"
    android:layout_height="40dp"
    android:background="@drawable/bdspeech_btn_orangelight_normal"
    android:text="按住说话"/>

  <TextView
    android:id="@+id/speechTextView"
    android:layout_margin="10dp"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
</LinearLayout>
```
MainActivity的类实现为：

```java
package com.yjp.speechrecognizer;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SpeechRecognizerTool.ResultsCallback {

  private Button mStartSpeechButton;
  private TextView mTextView;

  private SpeechRecognizerTool mSpeechRecognizerTool = new SpeechRecognizerTool(this);

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    mTextView = (TextView) findViewById(R.id.speechTextView);

    mStartSpeechButton = (Button) findViewById(R.id.startSpeechButton);
    mStartSpeechButton.setOnTouchListener(new View.OnTouchListener() {
      @Override
      public boolean onTouch(View v, MotionEvent event) {
        int action = event.getAction();
        switch (action) {
          case MotionEvent.ACTION_DOWN:
            mSpeechRecognizerTool.startASR(MainActivity.this);
            mStartSpeechButton.setBackgroundResource(
                R.drawable.bdspeech_btn_orangelight_pressed);
            break;
          case MotionEvent.ACTION_UP:
            mSpeechRecognizerTool.stopASR();
            mStartSpeechButton.setBackgroundResource(
                R.drawable.bdspeech_btn_orangelight_normal);
            break;
          default:
            return false;
        }

        return true;
      }
    });
  }

  @Override
  protected void onStart() {
    super.onStart();
    mSpeechRecognizerTool.createTool();
  }

  @Override
  protected void onStop() {
    super.onStop();
    mSpeechRecognizerTool.destroyTool();
  }

  @Override
  public void onResults(String result) {
    final String finalResult = result;
    MainActivity.this.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        mTextView.setText(finalResult);
      }
    });
  }
}
```

可以运行看一下效果，感觉识别率还是不错的。

﻿using System;
using System.Threading.Tasks;
using BilibiliAutoLiver.Models.Entities;
using BilibiliAutoLiver.Models.Enums;
using BilibiliAutoLiver.Services.Interface;
using BilibiliAutoLiver.Utils;

namespace BilibiliAutoLiver.Models.Dtos.EasyModel
{
    public class EasyModelDesktopParamsConvertor : BaseEasyModelParamsConvertor
    {
        public EasyModelDesktopParamsConvertor(IFFMpegService ffmpegService, PushSetting setting) : base(ffmpegService, setting)
        {

        }

        protected override Task Check(PushSettingUpdateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.InputScreen))
            {
                throw new Exception("推流屏幕范围不能为空");
            }
            if (!ScreenParamsHelper.TryParse(request.InputScreen, out string message, out _))
            {
                throw new Exception(message);
            }
            if (request.DesktopAudioFrom && string.IsNullOrWhiteSpace(request.DesktopAudioDeviceName))
            {
                throw new Exception("当选择推流音频来源于设备时，音频设备不能为空");
            }

            this.Setting.InputScreen = request.InputScreen;
            this.Setting.InputAudioSource = request.DesktopAudioFrom ? InputAudioSource.Device : InputAudioSource.File;
            this.Setting.AudioId = !request.DesktopAudioFrom && request.DesktopAudioId.HasValue && request.DesktopAudioId.Value > 0 ? request.DesktopAudioId.Value : null;
            this.Setting.AudioDevice = request.DesktopAudioFrom ? request.DesktopAudioDeviceName : "";

            return Task.CompletedTask;
        }
    }
}

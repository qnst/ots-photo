using QN.EDF.Model;
using QN.EDF.Wechat.Model;
using QN.Ots.Photo.Core.BusinessEntity;

namespace QN.Ots.Photo.Core.ServiceInterface
{
    public interface IWechatSI
    {
        BizData<string> WeChatAuthorize(WxAuthorizeBiz wam);

        BizData<object> BindPhone(DecodePhoneBiz bph);
    }
}
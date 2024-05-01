using QN.EDF.Common.Util;

namespace Photo.Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var pwd = "123";
            var salt = "QN-Photography-ots-photography--";
            var pwdMd5 = QNEncrypt.MD5(pwd + salt);
        }
    }
}
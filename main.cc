#include <napi.h>
#include "Kiwi.h"

Napi::Number wrap_init(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  Napi::Error error;
  if (info.Length() < 1)
  {
    error = Napi::Error::New(env, "init: expected 1 argument");
  }
  else if (info[0].IsString() == false)
  {
    error = Napi::Error::New(env, "init: expected 1 argument of type string");
  }
  if (error)
  {
    error.ThrowAsJavaScriptException();
    return Napi::Number::New(env, -1);
  }
  Napi::String str = info[0].As<Napi::String>();
  std::string utf8Str = str.Utf8Value();
  const char *charStr = utf8Str.c_str();
  int result = KiwiInit(charStr);
  return Napi::Number::New(env, result);
}

Napi::Object wrap_serverToLocal(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  Napi::Error error;
  if (info.Length() < 3)
  {
    error = Napi::Error::New(env, "init: expected 3 argument");
  }
  else if (info[0].IsString() == false)
  {
    error = Napi::Error::New(env, "name type not is string");
  }
  else if (info[1].IsString() == false)
  {
    error = Napi::Error::New(env, "ip type not is string");
  }
  else if (info[2].IsString() == false)
  {
    error = Napi::Error::New(env, "port type not is string");
  }
  if (error)
  {
    error.ThrowAsJavaScriptException();
    return Napi::Object::New(env);
  }
  Napi::String _name = info[0].As<Napi::String>();
  Napi::String _ip = info[1].As<Napi::String>();
  Napi::String _port = info[2].As<Napi::String>();

  std::string utf8_name = _name.Utf8Value();
  std::string utf8_ip = _ip.Utf8Value();
  std::string utf8_port = _port.Utf8Value();

  const char *char_name = utf8_name.c_str();
  const char *char_ip = utf8_ip.c_str();
  const char *char_port = utf8_port.c_str();

  char *copy_char_ip = strdup(char_ip);
  char *copy_char_port = strdup(char_port);

  int code = KiwiServerToLocal(char_name, copy_char_ip, 32, copy_char_port, 10);

  Napi::Object obj = Napi::Object::New(env);
  obj.Set("ip", Napi::String::New(env, copy_char_ip));
  obj.Set("port", Napi::String::New(env, copy_char_port));
  obj.Set("code", Napi::Number::New(env, code));

  free(copy_char_ip);
  free(copy_char_port);

  return obj;
}

Napi::String wrap_getOriginalKey(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::String::New(env, "#6uvc08b*@c&*)@0");
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set("initial", Napi::Function::New(env, wrap_init));
  exports.Set("serverToLocal", Napi::Function::New(env, wrap_serverToLocal));
  exports.Set("getOriginalKey", Napi::Function::New(env, wrap_getOriginalKey));
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
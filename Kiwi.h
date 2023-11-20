#pragma once

#ifdef __cplusplus
extern "C" {
#endif

int KiwiInit(const char* appkey);

int KiwiServerToLocal(const char* name, char* ip, int ip_len, char* port, int port_len);

int KiwiSendLog(int mtype, const char* data);

#ifdef __cplusplus
}
#endif

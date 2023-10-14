FROM ubuntu:23.04

RUN apt update
RUN apt install -y nodejs npm
RUN useradd -ms /bin/bash vsce

# for generate extension
RUN npm install -g yo generator-code

# for publish extension
RUN npm install -g @vscode/vsce

USER vsce

ENV USER vsce
ENV HOME /home/vsce

RUN mkdir -p /home/vsce/.config

# owner is root
COPY . /extension

# owner is vsce
RUN cp -r /extension /home/vsce/extension

WORKDIR /home/vsce/extension


CMD ["/bin/bash"]
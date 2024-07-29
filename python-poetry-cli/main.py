#!/usr/bin/env python

import click


@click.group()
def cli():
    pass


@cli.command("cat", help="Concatenates files")
@click.argument("file", multiple=True, type=click.File(mode="r", encoding="utf-8"))
def cat(files):
    for file in files:
        print(file.read())

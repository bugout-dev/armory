from setuptools import find_packages, setup

long_description = ""
with open("README.md") as ifp:
    long_description = ifp.read()

setup(
    name="armory",
    version="0.0.1",
    packages=find_packages(),
    install_requires=[
        "boto3",
        "eth-brownie",
        "requests",
        "moonstreamdb",
        "tqdm",
        "moonworm",
    ],
    extras_require={
        "dev": [
            "black",
            "mypy",
            "isort",
        ],
        "distribute": ["setuptools", "twine", "wheel"],
    },
    description="Workers and crawlers for Armory",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Moonstream",
    author_email="engineering@moonstream.to",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Programming Language :: Python",
        "License :: OSI Approved :: Apache Software License",
        "Topic :: Software Development :: Libraries",
    ],
    python_requires=">=3.8",
    url="https://github.com/bugout-dev/armory",
    entry_points={
        "console_scripts": [
            "armory=armory.cli:main",
        ]
    },
    include_package_data=True,
)
